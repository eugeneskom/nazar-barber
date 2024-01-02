import React, { useEffect, useState } from 'react'
import { Barber } from '../types'
import { useNavigate } from 'react-router-dom'
import BarberCard from './BarberCard'
import axios from 'axios'

function BarberList() {
    const navigate = useNavigate()
    const [barbers, setBarbers] = useState<Barber[]>([]) // Use the Barber type here
    const [loading, setLoading] = useState<boolean>(true) // Specify boolean type
    const openBarberPage = (id: number) => {
        navigate(`/barber/${id}`)
    }
    useEffect(() => {
        async function fetchBarbers() {
            try {
                const response = await axios.get(
                    'http://nazar-barber.test/wp-json/myapi/v1/barbers'
                )
                // if (!response.ok) {
                //     throw new Error('Network response was not ok')
                // }
                console.log(response, 'fetchBarbers response')
                const data: Barber[] =  response?.data; // Use the Barber type here
                setBarbers(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching barbers:', error)
                setLoading(false)
            }
        }

        fetchBarbers()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Barbers</h1>
            <ul className='workers flex justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3'>
                {barbers.map((barber) => (
                    <BarberCard
                        barber={barber}
                        // appointment={workerAppntmts}
                        key={barber.id}
                    />
                    // <li
                    //     key={barber.id}
                    //     onClick={() => openBarberPage(barber.id)}
                    // >
                    //     <h2>{barber.name}</h2>
                    //     <p>{barber.description}</p>
                    //     <p>Age: {barber.age}</p>
                    //     <img src={barber.picture} alt={barber.name} />
                    //     <p>Availability: {String(barber.availability)}</p>
                    // </li>
                ))}
            </ul>
        </div>
    )
}

export default BarberList
