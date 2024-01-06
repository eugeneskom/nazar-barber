import { useEffect, useState } from 'react'
import './App.css'
import Header from './Templates/Header'
import { workers, appointments } from './data'
import BarberCard from './components/BarberCard'
import { Barber } from './types'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from 'react-router-dom'
import BarberPage from './components/BarberPage'
import axios from 'axios'
import BarberList from './components/BarberList'
import AdminPanel from './components/AdminPanel'

// create a list of barbers
// when clicking on barber open his page in another route
// on barber's page show calendar as on website with example
// at the bottom show available time
// when user selected date and time show him login page with options as login with google/ facebook and so on.
// if possible to make him login with phone number by receiving OTP number



function App() {

    const [barbers, setBarbers] = useState<Barber[]>([]) // Use the Barber type here
    const [loading, setLoading] = useState<boolean>(true) // Specify boolean type

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
    return (
        <>
            {/* Need to create a separate component for barbers list/ also better start using state management system because it is getting messy */}

            <Router>
                <Header />
                <Routes>
                    <Route index path="/" element={<BarberList barbers={barbers} loading={loading}/>} />
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/barber/:id" element={<BarberPage barbers={barbers}/>} />
                </Routes>
            </Router>
        </>
    )
}

export default App
