import React, { useEffect, useState } from 'react'
import { Barber } from '../types'
import { useNavigate } from 'react-router-dom'
import BarberCard from './BarberCard'
import axios from 'axios'

interface BarberListProps {
    barbers: Barber[]
    loading: boolean
}

function BarberList({ barbers, loading }: BarberListProps) {
    const [availableBarbers, setAvailableBarbers] = useState<Barber[]>([])

    useEffect(() => {
      const filteredBarbers = barbers.filter((barber) => barber.available === true)
      setAvailableBarbers(filteredBarbers)

    }, [barbers])
    

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3">
            <h1 className="text-center mb-7 text-5xl">Barbers</h1>
            <ul className="workers flex justify-between flex-wrap gap-3">
                {availableBarbers.map((barber) => (
                    <BarberCard barber={barber} key={barber.id} />
                ))}
            </ul>
        </div>
    )
}

export default BarberList
