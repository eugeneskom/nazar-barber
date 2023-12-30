export const workers = [
    {
        id: 1,
        name: 'John Doe',
        title: 'Senior Barber',
        image: 'url_to_image_of_John_Doe',
        bio: 'John has over 10 years of experience...',
    },
    {
        id: 2,
        name: 'Jane Smith',
        title: 'Barber',
        image: 'url_to_image_of_Jane_Smith',
        bio: 'Jane specializes in modern haircuts...',
    },
    // More workers...
]

export const appointments = [
    {
        workerId: 1,
        availableSlots: [
            { id: 1, date: '2023-12-03', time: '09:00' },
            { id: 2, date: '2023-12-03', time: '10:00' },
        ],
    },
    {
        workerId: 2,
        availableSlots: [
            { id: 1, date: '2023-12-03', time: '09:00' },
            { id: 2, date: '2023-12-03', time: '10:00' },
        ],
    },
    // Add more workers with their slots as needed...
]

export const slots =  [
        {
            "id": 1,
            "date": "2023-12-03",
            "time": "09:00"
        },
        {
            "id": 2,
            "date": "2023-12-03",
            "time": "10:00"
        },
        {
            "id": 3,
            "date": "2023-12-03",
            "time": "11:00"
        },
        {
            "id": 4,
            "date": "2023-12-03",
            "time": "12:00"
        },
        {
            "id": 5,
            "date": "2023-12-03",
            "time": "13:00"
        },
        {
            "id": 6,
            "date": "2023-12-03",
            "time": "14:00"
        },
        {
            "id": 7,
            "date": "2023-12-03",
            "time": "15:00"
        },
        {
            "id": 8,
            "date": "2023-12-03",
            "time": "16:00"
        },
        {
            "id": 9,
            "date": "2023-12-03",
            "time": "17:00"
        },
        {
            "id": 10,
            "date": "2023-12-03",
            "time": "18:00"
        },
        // You can continue adding more slots as needed
    ]
