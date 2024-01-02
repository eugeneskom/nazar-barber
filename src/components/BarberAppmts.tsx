import React, { useEffect, useState } from 'react'
import { WorkerSchedule, TimeSlot, Appointment } from '../types'
import { slots } from '../data'
import { SubmitData } from './BarberPage'
interface BarberAppmtsProps {
    appointments: Appointment[]
    workerId: number | undefined
    setSubmitData: (data: any) => void
    submitData: SubmitData
}

function BarberAppmts({
    appointments,
    workerId,
    setSubmitData,
    submitData,
}: BarberAppmtsProps) {
    const [barberSlots, setBarberSlots] = useState<TimeSlot[]>(slots)

    const filteredAppointments = appointments.filter((appt) => {
        const date1 = new Date(appt.date)
        console.log(
            new Date(appt.date.split('T')[0]),
            'new Date(appt.date)',
            submitData?.apptDate,
            'submitData?.apptDate'
        )
        const date1Year = date1?.getFullYear()
        const date1Month = date1?.getMonth()
        const date1Day = date1?.getDate()

        const date2Year = submitData?.apptDate?.getFullYear()
        const date2Month = submitData?.apptDate?.getMonth()
        const date2Day = submitData?.apptDate?.getDate()
        return date1Year === date2Year && date1Month === date2Month && date1Day === date2Day;
    })
    console.log(filteredAppointments, 'filteredAppointments')
    useEffect(() => {
        console.log('appointments', appointments, ' submitData', submitData)
        // const availSlots = slots.filter(
        //     (slot) =>
        //         !availableSlots.some(
        //             (availableSlot) => availableSlot.id === slot.id
        //         )
        // )
        // setBarberSlots(availSlots)

        return () => {}
    }, [])

    return (
        <ul className=" text-white flex gap-1">
            {barberSlots.map((slot) => (
                <li className="" key={slot.id}>
                    {/* <p>Date: {slot.date}</p> */}
                    <button
                        className={`btn p-3  bg-green-400 cursor-pointer focus:bg-green-600 ${
                            submitData.time === slot.time ? 'bg-green-600' : ''
                        }`}
                        onClick={() =>
                            setSubmitData((prev: SubmitData) => ({
                                ...prev,
                                time: slot.time,
                            }))
                        }
                    >
                        <p>Time: {slot.time}</p>
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default BarberAppmts
