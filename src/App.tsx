import { useEffect, useState } from 'react'
import './App.css'
import Header from './Templates/Header'
import { workers, appointments } from './data'
import BarberCard from './components/BarberCard'
import { Barber } from './types'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BarberPage from './components/BarberPage'
import axios from 'axios'
import BarberList from './components/BarbersApiTest'

// create a list of barbers
// when clicking on barber open his page in another route
// on barber's page show calendar as on website with example
// at the bottom show available time
// when user selected date and time show him login page with options as login with google/ facebook and so on.
// if possible to make him login with phone number by receiving OTP number

function App() {
    const [barbers, setBarbers] = useState<Barber[]>([])

    // on load I will get employees/appointments data here
    useEffect(() => {
        const getBarbers = async () => {
            try {
                const response = await axios.get(
                    'http://nazar-barber.test/wp-json/barbers/v1/get_data/'
                )
                // const response = await axios.get(
                //     'http://nazar-barber.test/wp-json/wp/v2/barbers'
                // )
                console.log(response, 'response')
            } catch (error) {}
        }
        // getBarbers()

        const url = 'http://nazar-barber.test/wp-json/barbers/v1/create_data/'
        const data = {
            key1: 'value1',
            key2: 'value2',
        }

        const username = 'Eugene'
        const appPassword = 'wN32qAffK0^viAgO#z'

        const headers = new Headers({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(username + ':' + appPassword),
        })

        // fetch(url, {
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(data),
        // })
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .catch((error) => console.error('Error:', error))

        // setBarbers(workers)
        return () => {}
    }, [])



    return (
        <>
            <Header />
            {/* Need to create a separate component for barbers list/ also better start using state management system because it is getting messy */}

            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <BarberList />
                            {/* <ul className="workers flex justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3">
                                {barbers.map((worker) => {
                                    const workerAppntmts = appointments.filter(
                                        (app) => app.workerId !== worker.id
                                    )[0]

                                    console.log(
                                        workerAppntmts,
                                        'workerAppntmts'
                                    )
                                    return (
                                        <BarberCard
                                            barber={worker}
                                            appointment={workerAppntmts}
                                            key={worker.id}
                                        />
                                    )
                                })}

                            </ul> */}
                            </>
                        }
                    />
                    <Route
                        path="/barber/:id"
                        element={
                            <BarberPage
                            />
                        }
                    />
                </Routes>
            </Router>
        </>
    )
}

export default App
