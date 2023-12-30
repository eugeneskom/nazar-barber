import React, { useState, useEffect } from 'react'
import { Barber, WorkerSchedule } from '../types'
import { useParams, useNavigate } from 'react-router-dom'
import BarberAppmts from './BarberAppmts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface BarberPageProps {
    barbers: Barber[]
    appointments: WorkerSchedule[]
    setAppt: (workerId: number, slotId: number) => void
}

function BarberPage({ barbers, appointments, setAppt }: BarberPageProps) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [apptDate, setApptDate] = useState<Date | null>(null)
    const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
    const [barbersAppts, setBarbersAppts] = useState<WorkerSchedule | null>(
        null
    )
    const [isApptOpen, setIsApptOpen] = useState(false)
    const toggleApptmts = () => {
        setIsApptOpen(!isApptOpen)
    }
    const navigateHome = () => {
      navigate('/')
    }
    useEffect(() => {
        const activeBarver = barbers.filter((barber) =>
            id ? barber.id === +id : false
        )[0]
        setSelectedBarber(activeBarver)

        const workerAppntmts = appointments.filter((app) =>
            id ? app.workerId !== +id : false
        )[0]
        setBarbersAppts(workerAppntmts)
        return () => {}
    }, [id, barbers, appointments])

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <button
                type="button"
                onClick={navigateHome}
                className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
                <svg
                    className="w-5 h-5 rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                </svg>
                <span>Go back</span>
            </button>
            {selectedBarber ? (
                <article>
                    <h1>{selectedBarber.name}</h1>
                    <p>{selectedBarber.title}</p>
                    <p>{selectedBarber.bio}</p>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={toggleApptmts}
                    >
                        Show available slots
                    </button>
                </article>
            ) : (
                ''
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={apptDate}
                    onChange={(date) => setApptDate(date)}
                    label="Select date"
                />
            </LocalizationProvider>

            {
                // isApptOpen && barbersAppts

                apptDate && barbersAppts && (
                    <BarberAppmts
                        appointment={barbersAppts}
                        setAppt={setAppt}
                        workerId={selectedBarber?.id ?? 0}
                    />
                )
            }
        </section>
    )
}

export default BarberPage
