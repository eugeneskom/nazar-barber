import React, { useEffect, useState } from 'react'
import { WorkerSchedule, TimeSlot } from '../types'
import { slots } from '../data'
interface BarberAppmtsProps {
    appointment: WorkerSchedule
    workerId: number
    setAppt: (workerId: number, slotId: number) => void
}

function BarberAppmts({
    appointment: { availableSlots },
    workerId,
    setAppt,
}: BarberAppmtsProps) {
    const [barberSlots, setBarberSlots] = useState<TimeSlot[]>([])

    useEffect(() => {
        const availSlots = slots.filter(
            (slot) =>
                !availableSlots.some(
                    (availableSlot) => availableSlot.id === slot.id
                )
        )
        setBarberSlots(availSlots)

        return () => {}
    }, [])

    return (
        <ul className=" text-white flex gap-1">
            {barberSlots.map((slot) => (
                <li className="" key={slot.id}>
                    {/* <p>Date: {slot.date}</p> */}
                    <button
                        className="btn p-3  bg-green-400 cursor-pointer focus:bg-green-600"
                        onClick={() => setAppt(workerId, slot.id)}
                    >
                        <p>Time: {slot.time}</p>
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default BarberAppmts
