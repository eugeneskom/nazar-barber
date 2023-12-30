// {
//   "id": 1,
//   "name": "John Doe",
//   "title": "Senior Barber",
//   "image": "url_to_image_of_John_Doe",
//   "bio": "John has over 10 years of experience..."
// },

export interface Barber {
    id: number
    name: string
    title: string
    image: string
    bio: string
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