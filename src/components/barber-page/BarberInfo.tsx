import React from 'react'
import { Barber } from '../../types'

interface BarberInfoProps {
    barber: Barber | null
}

function BarberInfo({ barber }: BarberInfoProps) {
    if (!barber) {
        return (
            <article className="loading">
                <div className="rounded-full h-40 w-40 mb-5 bg-gray-300 animate-pulse"></div>

                <h1 className="mb-5">
                    <span className="block bg-gray-300 w-24 h-6 animate-pulse rounded-2xl"></span>
                </h1>

                <p className="mb-5">
                    <span className="block bg-gray-300 w-12 h-6 animate-pulse mb-3 rounded-2xl"></span>
                </p>
                <p className="bg-gray-300 animate-pulse rounded-2xl mb-5">
                    <span className="block  w-full h-3 "></span>
                    <span className="block  w-full h-3 "></span>
                    <span className="block  w-full h-3 "></span>
                    <span className="block  w-full h-3 "></span>
                </p>

                <p className="mb-5">
                    <span className="block bg-gray-300 w-24 h-6 animate-pulse rounded-2xl"></span>
                </p>
            </article>
        )
    }

    return (
        <article>
            <img
                src={barber.picture}
                alt={barber.name}
                className="rounded-full h-40 w-40 mb-5"
            />
            <h1 className="mb-5">
                <span>Name:</span> {barber.name}
            </h1>
            <p className="mb-5">
                <span className="block">Biography:</span> {barber.description}
            </p>
            <p className="mb-5">Age: {barber.age}</p>
        </article>
    )
}

export default BarberInfo
