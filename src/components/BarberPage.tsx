import React, { useState, useEffect } from 'react'
import { Barber, WorkerSchedule, Appointment } from '../types'
import { useParams, useNavigate } from 'react-router-dom'
import BarberAppmts from './BarberAppmts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ScheduledPopup from './ScheduledPopup'
import axios from 'axios'

interface BarberPageProps {
    barbers: Barber[]
    appointments: Appointment[]
}

export interface SubmitData {
    apptDate: Date | null
    customerName: string
    customerLastName: string
    phone: string
    time: string
    id: string
}

function BarberPage() {
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
    const [barbersAppts, setBarbersAppts] = useState<WorkerSchedule | null>(
        null
    )
    const [isApptOpen, setIsApptOpen] = useState(false)
    const toggleApptmts = () => {
        setIsApptOpen(!isApptOpen)
        const body = document.querySelector('body');
        if(body) {
            body.classList.add("dark:bg-gray-900", "antialiased", "dark:text-white" )
        }
    }
    const navigateHome = () => {
        navigate('/')
    }
    // useEffect(() => {
    //     const activeBarver = barbers.filter((barber) =>
    //         id ? barber.id === +id : false
    //     )[0]
    //     setSelectedBarber(activeBarver)

    //     const workerAppntmts = appointments.filter((app) =>
    //         id ? app.workerId !== +id : false
    //     )[0]
    //     setBarbersAppts(workerAppntmts)
    //     return () => {}
    // }, [id, barbers, appointments])

    useEffect(() => {
        if (!id) return

        const getBarbersData = async (id: number) => {
            try {
                const response = await axios.get(
                    `http://nazar-barber.test/wp-json/myapi/v1/barbers/${id}`
                )

                setSelectedBarber(response.data)
                console.log(response, 'response')
            } catch (error) {}
        }
        getBarbersData(+id)

        return () => {}
    }, [id])

    const handleSetAppointment = (
        e: React.FormEvent<HTMLFormElement>,
        time?: string
    ) => {
        e.preventDefault()

        console.log(submitData, 'submitData')
    
        try {
            const response = axios.post(
                `http://nazar-barber.test/wp-json/myapi/v1/add-appointment`,
                {
                    id: Number(id),
                    customer: submitData.customerName + ' ' + submitData.customerLastName, 
                    date: submitData.apptDate,
                    time: submitData.time,
                }
            )

            toggleApptmts()
            
            console.log(response, 'response handleSetAppointment')
        } catch (error) {}
    }

    return (
        <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSetAppointment}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
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
                    <article onClick={() => {}}>
                        <img src={selectedBarber.picture} alt={selectedBarber.name} className='rounded-full' />
                        <h1>{selectedBarber.name}</h1>
                        <p>{selectedBarber.description}</p>
                        <p>{selectedBarber.age}</p>
                        {/* <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={toggleApptmts}
                        >
                            Show available slots
                        </button> */}
                    </article>
                ) : (
                    ''
                )}
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

                    submitData.apptDate && selectedBarber?.appointments && (
                        <BarberAppmts
                            appointments={selectedBarber?.appointments}
                            setSubmitData={setSubmitData}
                            submitData={submitData}
                            workerId={selectedBarber?.id ?? 0}
                        />
                    )
                }

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
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
                <label className="block text-gray-700 text-sm font-bold mb-2">
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

            <ScheduledPopup isOpen={isApptOpen} submitData={submitData} toggleApptmts={toggleApptmts}/>
        </section>
    )
}

export default BarberPage
