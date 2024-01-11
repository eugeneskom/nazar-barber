import React, { useEffect, useState } from 'react'
import { Appointment, Barber } from '../../types'
import axios from 'axios'
import BarbersApptmts from './BarbersApptmts'
interface AdminPanelProps {
    barbers: Barber[]
}

function AdminPanel({ barbers }: AdminPanelProps) {
    
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [scheduleDetails, setScheduleDetails] = useState<Barber[]>([])

    useEffect(() => {
        const getAllAppointments = async (): Promise<Appointment[]> => {
            try {
                const response = await axios.get(
                    'http://barber-nazar.eugeneskom.com/wp-json/myapi/v1/appointments'
                )
                console.log(response.data, 'getAllAppointments response')
                const data: Appointment[] = response?.data
                return data
            } catch (error) {
                console.error('Error fetching appointments:', error)
                return []
            }
        }
        if (barbers.length === 0) return
     
        getAllAppointments()
            .then((data) => {
                setAppointments(data)

                const barbersIds = new Set(data.map((appt) => appt.id))

                const barbersNames = barbers.map((barber) => ({
                    id: barber.id,
                    name: barber.name,
                }))

                console.log('allAppointments', barbersIds, barbersNames)
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error)
            })

        // const allAppointments = getAllAppointments();

        return () => {}
    }, [barbers])

    return (
        <>
            <div>AdminPanel</div>
            {appointments?.map((appt) => (
                <div key={appt.id}>
                    <p>{appt.date}</p>
                    <p>{appt.time}</p>
                </div>
            ))}
        </>
    )
}

export default AdminPanel
