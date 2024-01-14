import React, { useEffect, useState } from 'react'
import { Appointment, Barber } from '../../types'
import axios from 'axios'
import BarbersApptmts from './BarbersApptmts'
import AppointmentSchedule from './Appointment'
interface AdminPanelProps {
    barbers: Barber[]
}

interface ApptWithBarber extends Appointment {
    barberName?: string
    barberAvatar?: string
}

function AdminPanel({ barbers }: AdminPanelProps) {
    const [appointments, setAppointments] = useState<ApptWithBarber[]>([])
    const [scheduleDetails, setScheduleDetails] = useState<Barber[]>([])

    useEffect(() => {
        const getAllAppointments = async (): Promise<ApptWithBarber[]> => {
            try {
                const response = await axios.get(
                    'http://barber-nazar.eugeneskom.com/wp-json/myapi/v1/appointments'
                )
                console.log(response.data, 'getAllAppointments response')
                const data: ApptWithBarber[] = response?.data
                return data
            } catch (error) {
                console.error('Error fetching appointments:', error)
                return []
            }
        }
        if (barbers.length === 0) return

        getAllAppointments()
            .then((data) => {
                const updatedBarbersWithAppts = addApptsToBarbers(barbers, data)
                setScheduleDetails(updatedBarbersWithAppts)
                console.log('updatedBarbersWithAppts', updatedBarbersWithAppts)
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error)
            })

        // const allAppointments = getAllAppointments();

        return () => {}
    }, [barbers])

    const addApptsToBarbers = (
        barbers: Barber[],
        appointments: Appointment[]
    ) => {
        const updatedBarbersWithAppts = appointments.reduce(
            (accumulatedBarbers, appt) => {
                // Find barber by id
                const barber = accumulatedBarbers.find(
                    (barber) => barber.id === appt.id
                )
                if (!barber) return accumulatedBarbers
                const updatedBarbers = [...accumulatedBarbers]
                updatedBarbers.map((barber) => {
                    if (!barber.appointments) barber.appointments = []

                    if (barber.id === appt.id) {
                        barber.appointments = [...barber.appointments, appt]
                    }
                    return barber
                })
                // Update barber data
                console.log('appt', appt, 'accumulatedBarbers', updatedBarbers)
                return updatedBarbers
            },
            barbers
        )
        return updatedBarbersWithAppts
        console.log('updatedBarbersWithAppts', updatedBarbersWithAppts)
    }

    console.log('scheduleDetails', scheduleDetails)

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3">
            <div>AdminPanel</div>
            <ul className="flex space-between gap-3">
                {scheduleDetails?.map((barber) => (
                    <li key={barber.id} className="w-1/2">
                        <h1 className='mb-3'>Barber: {barber.name}</h1>
                        <img
                            className="h-12 w-12 rounded-full mb-5"
                            src={barber.picture}
                            alt={barber.name}
                        />
                        <ul className='flex flex-col gap-3'>
                            {barber.appointments?.map((appt) => (

                                <AppointmentSchedule appt={appt} />
                                // <li
                                //     key={appt.id}
                                //     className="btn p-3 bg-green-400 cursor-pointer focus:bg-green-600 w-full"
                                // >
                                //     <h2>Client: {appt.customer}</h2>
                                //     <div className="flex gap-3 ">
                                //         <p>{appt.date?.split('T')[0]}</p>
                                //         <p>{appt.time}</p>
                                //     </div>
                                // </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPanel
