import React, { useState, useEffect } from 'react'
import { Barber, WorkerSchedule, Appointment } from '../types'
import { useParams, useNavigate } from 'react-router-dom'
import BarberAppmts from './appointments/BarberAppmts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ScheduledPopup from './ScheduledPopup'
import axios from 'axios'

interface BarberPageProps {
    barbers: Barber[]
    // appointments: Appointment[]
}

export interface SubmitData {
    apptDate: Date | null
    customerName: string
    customerLastName: string
    phone: string
    time: string
    id: string
}

interface BarberPageProps {
    barbers: Barber[]
}

function BarberPage({ barbers }: BarberPageProps) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [submitData, setSubmitData] = useState({
        apptDate: null,
        customerName: '',
        customerLastName: '',
        phone: '',
        time: '',
        id: id,
    } as SubmitData)
    const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
    const [barbersAppts, setBarbersAppts] = useState<Appointment[] | []>([])
    const [isApptOpen, setIsApptOpen] = useState(false)
    const toggleApptmts = () => {
        setIsApptOpen(!isApptOpen)
        const body = document.querySelector('body')
        if (body) {
            body.classList.add(
                'dark:bg-gray-900',
                'antialiased',
                'dark:text-white'
            )
        }
    }
    const navigateHome = () => {
        navigate('/')
    }

    useEffect(() => {
        if (!id) return

        const getBarbersAppts = async (id: number) => {
            try {
                const response = await axios.get(
                    `http://barber-nazar.eugeneskom.com/wp-json/myapi/v1/barbers/${id}`
                )

                if (response.status === 200 && response.data) {
                    setBarbersAppts(response.data.appointments || [])
                }
                // setSelectedBarber(response.data)
                console.log(response, 'response')
            } catch (error) {}
        }
        getBarbersAppts(+id)

        // filtering barbers to show the curren barber by id

        const filterBarbers = (id: string) => {
            const barber = barbers.find((barber) => barber.id === Number(id))
            setSelectedBarber(barber ?? null)
        }

        filterBarbers(id)

        return () => {}
    }, [id, barbers])

    const handleSetAppointment = (
        e: React.FormEvent<HTMLFormElement>,
        time?: string
    ) => {
        e.preventDefault()

        console.log(submitData, 'submitData')

        try {
            const response = axios.post(
                `http://barber-nazar.eugeneskom.com/wp-json/myapi/v1/add-appointment`,
                {
                    id: Number(id),
                    customer:
                        submitData.customerName +
                        ' ' +
                        submitData.customerLastName,
                    date: submitData.apptDate,
                    time: submitData.time,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${'dca42d531e297ac80e48f4077369a8cf-94b2397a-6b7f-4cb2-9fbd-b990cfd554d2'}`,
                    },
                }
            )

            toggleApptmts()

            console.log(response, 'response handleSetAppointment')
        } catch (error) {}
    }

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
            <button
                type="button"
                onClick={navigateHome}
                className="mb-5 w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
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
                <article onClick={() => {}}>
                    <img
                        src={selectedBarber.picture}
                        alt={selectedBarber.name}
                        className="rounded-full h-40 w-40 mb-5"
                    />
                    <h1 className="mb-5">
                        <span>Name:</span> {selectedBarber.name}
                    </h1>
                    <p className="mb-5">
                        <span className="block">Biography:</span>{' '}
                        {selectedBarber.description}
                    </p>
                    <p className="mb-5">Age: {selectedBarber.age}</p>
                </article>
            ) : (
                ''
            )}
            <form
                onSubmit={handleSetAppointment}
                className=""
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        value={submitData.apptDate}
                        onChange={(date) => {
                            if (date !== null) {
                                const jsDate = new Date(date) // Convert to a JavaScript Date object
                                setSubmitData((prev) => ({
                                    ...prev,
                                    apptDate: jsDate,
                                }))
                            }
                        }}
                        label="Select date"
                    />
                </LocalizationProvider>

                {
                    // isApptOpen && barbersAppts

                    submitData.apptDate &&(
                        <BarberAppmts
                            appointments={barbersAppts}
                            setSubmitData={setSubmitData}
                            submitData={submitData}
                            workerId={selectedBarber?.id ?? 0}
                        />
                    )
                }

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4 w-1/2">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text "
                        placeholder="Enter your name"
                        value={submitData.customerName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSubmitData((prev: SubmitData) => ({
                                ...prev,
                                customerName: e.target.value,
                            }))
                        }
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/2">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text "
                        placeholder="Enter your last name"
                        value={submitData.customerLastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSubmitData((prev: SubmitData) => ({
                                ...prev,
                                customerLastName: e.target.value,
                            }))
                        }
                    />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/2">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        placeholder="Enter your phone number"
                        value={submitData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSubmitData((prev: SubmitData) => ({
                                ...prev,
                                phone: e.target.value,
                            }))
                        }
                    />
                </label>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Schedule appointment
                </button>
                {}
            </form>

            <ScheduledPopup
                isOpen={isApptOpen}
                submitData={submitData}
                toggleApptmts={toggleApptmts}
            />
        </section>
    )
}

export default BarberPage
