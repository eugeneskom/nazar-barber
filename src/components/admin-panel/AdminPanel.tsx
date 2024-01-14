// import React, { useEffect, useState } from 'react'
import { 
    // Appointment, 
    Barber 
} from '../../types'
// import axios from 'axios'
// import BarbersApptmts from './BarbersApptmts'
import AppointmentSchedule from './Appointment'
interface AdminPanelProps {
    barbers: Barber[]
}

// interface ApptWithBarber extends Appointment {
//     barberName?: string
//     barberAvatar?: string
// }

function AdminPanel({ barbers }: AdminPanelProps) {


    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3">
            <div>AdminPanel</div>
            <ul className="flex space-between gap-3">
                {barbers?.map((barber) => (
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
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPanel
