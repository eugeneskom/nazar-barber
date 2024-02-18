import React, { useState, useEffect } from 'react'
import { Barber, Appointment } from '../../types'
import { useParams, useNavigate } from 'react-router-dom'
import BarberAppmts from '../appointments/BarberAppmts'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ScheduledPopup from '../ScheduledPopup'
import axios from 'axios'
import { PhoneInputComponent } from '../PhoneInput'
import BarberInfo from './BarberInfo'
import { TextField } from '@mui/material'

interface BarberPageProps {
    barbers: Barber[]
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

export interface FormValidationProps{
    apptDate: boolean
    customerName: boolean
    customerLastName: boolean
    phone: boolean
    time: boolean
}
function BarberPage({ barbers }: BarberPageProps) {
    const { id } = useParams()
    const navigate = useNavigate()
    const [submitData, setSubmitData] = useState<SubmitData>({
        apptDate: null,
        customerName: '',
        customerLastName: '',
        phone: '',
        time: '',
        id: id,
    } as SubmitData)
    const [formValidation, setFormValidation] = useState<FormValidationProps>({
        apptDate: false,
        customerName: false,
        customerLastName: false,
        phone: false,
        time: false,
    })
    const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
    const [barbersAppts, setBarbersAppts] = useState<Appointment[] | []>([])
    const [isApptOpen, setIsApptOpen] = useState(false)

    console.log('formValidation',formValidation)
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

    const handleSelectDate = (date: Date | null) => {
        if (date !== null) {
            const jsDate = new Date(date) // Convert to a JavaScript Date object
            setSubmitData((prev) => ({
                ...prev,
                apptDate: jsDate,
            }))

            setFormValidation((prev) => ({
                ...prev,
                apptDate: false,
            }))
        }
    }

    const validateForm = (data: SubmitData) => {
        const { apptDate, customerName, customerLastName, phone,time } = data

        setFormValidation((prev) => ({
            ...prev,
            apptDate: apptDate !== null,
            customerName: customerName == '',
            customerLastName: customerLastName == '',
            phone: phone.length >= 12,
            time: time !== '',
        }))

        if (
            apptDate === null ||
            customerName === '' ||
            customerLastName === '' ||
            phone.length < 12
        ) {
            return false
        }
        return true
    }

    const handleSetAppointment = (
        e: React.FormEvent<HTMLFormElement>,
        time?: string
    ) => {
        e.preventDefault()

        const isFormValid = validateForm(submitData)
        console.log('isFormValid', isFormValid)

        console.log(submitData, 'submitData')

        if (!isFormValid) return

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
                    customerPhone: submitData.phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${'dca42d531e297ac80e48f4077369a8cf-94b2397a-6b7f-4cb2-9fbd-b990cfd554d2'}`,
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

            <BarberInfo barber={selectedBarber} />

            <form onSubmit={handleSetAppointment} className="">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={submitData.apptDate}
                        disablePast={true} // disable past dates
                        onChange={handleSelectDate}
                        label="Select date"
                    />
                </LocalizationProvider>
                {formValidation.apptDate && (
                    <p className="text-red-400">
                        Please select the date
                    </p>
                )}
                {
                    // isApptOpen && barbersAppts

                    submitData.apptDate && (
                        <BarberAppmts
                            appointments={barbersAppts}
                            setSubmitData={setSubmitData}
                            submitData={submitData}
                            formValidation={formValidation}
                        />
                    )
                }

                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4 w-1/2 mb-5">
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
                    {formValidation.customerName && (
                        <span className="text-red-400">
                            Please enter your name
                        </span>
                    )}
                </label>
                <label className="block text-gray-700 text-sm font-bold  w-1/2 mb-5">
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
                    {formValidation.customerLastName && (
                        <span className="text-red-400">
                            Please enter your last name
                        </span>
                    )}
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2 w-1/2">
                    <PhoneInputComponent
                        setSubmitData={setSubmitData}
                        submitData={submitData}
                    />
                    {formValidation.phone && (
                        <span className="text-red-400">
                            Please enter your phone number
                        </span>
                    )}
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
