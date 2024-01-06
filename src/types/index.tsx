
export interface Barber {
    id: number
    name: string
    title?: string
    image?: string
    bio?: string
    description: string
    picture: string
    availability: boolean
    age: string
    // appointments: Appointment[]
}

export interface Appointment {
  id: number
  date: string
  time: string
  customer: string
}

export interface TimeSlot {
  id: number;
  date: string;
  time: string;
}

export interface WorkerSchedule {
  workerId: number;
  availableSlots: TimeSlot[];
}