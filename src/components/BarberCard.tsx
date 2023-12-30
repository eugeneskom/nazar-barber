import React, { useState } from 'react'
import { Barber, WorkerSchedule } from '../types'
import BarberAppmts from './BarberAppmts'
import { useNavigate } from 'react-router-dom'
interface BarberProps {
    barber: Barber
    appointment: WorkerSchedule
    setAppt: (workerId:number, slotId:number) => void

}

function BarberCard({ barber, appointment,setAppt }: BarberProps) {
    const navigate = useNavigate()
    const [isApptOpen, setIsApptOpen] = useState(false)
    const toggleApptmts = () => {
        setIsApptOpen(!isApptOpen)
    }

    const openBarberPage = () => {
      navigate(`/barber/${barber.id}`)
    }

    return (
        <li className="barbers__card" key={barber.id}>
            <article>
                <h1>{barber.name}</h1>
                <p>{barber.title}</p>
                <p>{barber.bio}</p>
                <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={openBarberPage}
                >
                    Select barber 
                </button>
            </article>

            {isApptOpen ? <BarberAppmts appointment={appointment} setAppt={setAppt} workerId={barber.id}/> : ''}
        </li>
    )
}

export default BarberCard
