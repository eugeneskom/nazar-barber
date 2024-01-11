import React, { useState } from 'react'
import { Barber, WorkerSchedule } from '../types'
import BarberAppmts from './appointments/BarberAppmts'
import { useNavigate } from 'react-router-dom'
interface BarberProps {
    barber: Barber
}

function BarberCard({ barber }: BarberProps) {
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
            <article className=''>
                {/* <div className="barber__box"> */}
                    <img src={barber.picture} alt={barber.name} />
                {/* </div> */}
                {/* <div className="barber__content"> */}
                    <h1>Name: {barber.name}</h1>
                    <p>Age: {barber.age}</p>
                    <p className={`barbers__description`}>
                        BIO: {barber.description}
                    </p>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={openBarberPage}
                    >
                        Select barber
                    </button>
                {/* </div> */}
            </article>
        </li>
    )
}

export default BarberCard
