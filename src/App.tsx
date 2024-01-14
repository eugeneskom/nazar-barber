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
import BarberPage from './components/barber-page/BarberPage'
import axios from 'axios'
import BarberList from './components/BarberList'
import AdminPanel from './components/admin-panel/AdminPanel'
import Footer from './Templates/Footer'

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
                    'http://barber-nazar.eugeneskom.com/wp-json/myapi/v1/barbers'
                )
                // if (!response.ok) {
                //     throw new Error('Network response was not ok')
                // }
                console.log(response.data, 'fetchBarbers response')
                const data: Barber[] = response?.data // Use the Barber type here
                setBarbers(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching barbers:', error)
                setLoading(false)
            }
        }

        fetchBarbers()

        // var myHeaders = new Headers();
        // myHeaders.append(
        //     'Authorization',
        //     'App dca42d531e297ac80e48f4077369a8cf-94b2397a-6b7f-4cb2-9fbd-b990cfd554d2'
        // );
        // myHeaders.append('Content-Type', 'application/json');
        // myHeaders.append('Accept', 'application/json');

        // var raw = JSON.stringify({
        //     messages: [
        //         {
        //             destinations: [{ to: '380666994554' }],
        //             from: 'ServiceSMS',
        //             text: 'Hello,\n\nThis is a test message from Infobip. Have a nice day!',
        //         },
        //     ],
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        // };

        // fetch(
        //     'https://k2zzkn.api.infobip.com/sms/2/text/advanced',
        //     requestOptions
        // )
        //     .then((response) => response.text())
        //     .then((result) => console.log(result))
        //     .catch((error) => console.log('error', error));
    }, [])
    return (
        <>
            {/* Need to create a separate component for barbers list/ also better start using state management system because it is getting messy */}
            <main className='flex flex-col '>
                <Router>
                    <Header />
                    <Routes>
                        <Route
                            index
                            path="/"
                            element={
                                <BarberList
                                    barbers={barbers}
                                    loading={loading}
                                />
                            }
                        />
                        <Route path="/admin-panel" element={<AdminPanel barbers={barbers}/>} />
                        <Route
                            path="/barber/:id"
                            element={<BarberPage barbers={barbers} />}
                        />
                    </Routes>
                    <Footer />
                </Router>
            </main>
        </>
    )
}

export default App
