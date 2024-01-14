import React from 'react'
import { isFutureDateTime } from '../../helpers'
import { Appointment } from '../../types'
interface AppointmentProps {
    appt: Appointment
}
function AppointmentSchedule({ appt }: AppointmentProps) {
    const dateTime = `${appt.date.split('T')[0]}T${appt.time}`

    const isFuture = isFutureDateTime(dateTime)

    console.log(isFuture, 'isFuture')
    return (
        <li
            key={appt.id}
            className={`
            btn p-3 cursor-pointer w-full
            ${isFuture ? 'bg-green-400' : 'bg-gray-400'}
            `}
        >
            <h2>Client: {appt.customer}</h2>
            <p>
                {appt.date?.split('T')[0]} {appt.time}
            </p>
        </li>
    )
}

export default AppointmentSchedule
