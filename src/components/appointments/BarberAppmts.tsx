import React, { useEffect, useState } from 'react'
import { WorkerSchedule, TimeSlot, Appointment } from '../../types'
import { slots } from '../../data'
import { SubmitData } from '../barber-page/BarberPage'
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
        // console.log(
        //     new Date(appt.date?.split('T')[0]),
        //     'new Date(appt.date)',
        //     submitData?.apptDate,
        //     'submitData?.apptDate'
        // )
        const date1Year = date1?.getFullYear()
        const date1Month = date1?.getMonth()
        const date1Day = date1?.getDate()

        const date2Year = submitData?.apptDate?.getFullYear()
        const date2Month = submitData?.apptDate?.getMonth()
        const date2Day = submitData?.apptDate?.getDate()
        return (
            date1Year === date2Year &&
            date1Month === date2Month &&
            date1Day === date2Day
        )
    })

    const checkIfBooked = (time: string) => {
        const isBooked = filteredAppointments.some((appt) => appt.time === time)
        return isBooked
    }

    const handleTimeSelect = (time: string) => {
        const isTimeBooked = checkIfBooked(time)
        if (isTimeBooked) return
        setSubmitData((prev: SubmitData) => ({
            ...prev,
            time: time,
        }))
    }

    function GroupByTime(slots: TimeSlot[]): Record<string, TimeSlot[]> {
        const groupedSlots: Record<string, TimeSlot[]> = {
            Morning: [],
            Afternoon: [],
            Evening: [],
        }

        slots.forEach((slot) => {
            const hour = parseInt(slot.time.split(':')[0], 10)

            if (hour >= 6 && hour < 12) {
                groupedSlots.Morning.push(slot)
            } else if (hour >= 12 && hour < 18) {
                groupedSlots.Afternoon.push(slot)
            } else {
                groupedSlots.Evening.push(slot)
            }
        })

        return groupedSlots
    }

    // ...

    const groupedBarberSlots = GroupByTime(barberSlots)

    return (
        <ul className="text-white mt-5 ">
            {Object.entries(groupedBarberSlots).map(([timeOfDay, slots]) => (
                <li key={timeOfDay} className='mb-5'>
                    <h2 className='text-slate-800 text-4xl mb-2'>{timeOfDay}</h2>
                    <ul className="flex gap-1 flex-wrap time-slots">
                        {slots.map((slot) => (
                            <li key={slot.id} className='time-slots__item'>
                                <button
                                    type="button"
                                    className={`btn p-3 bg-green-400 cursor-pointer focus:bg-green-600 w-full ${
                                        submitData.time === slot.time
                                            ? 'bg-green-600'
                                            : ''
                                    }
                        ${
                            checkIfBooked(slot.time)
                                ? 'bg-red-600 disabled-button'
                                : ''
                        }
                        `}
                                    onClick={() => handleTimeSelect(slot.time)}
                                >
                                    Time: {slot.time}
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}

export default BarberAppmts
