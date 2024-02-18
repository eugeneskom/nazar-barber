// import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { SubmitData } from './barber-page/BarberPage';
import 'react-international-phone/style.css';
interface PhoneInputProps {
    setSubmitData: (data: any) => void;
    submitData: any;
}
export const PhoneInputComponent = ({setSubmitData,  submitData}: PhoneInputProps) => {
  // const [phone, setPhone] = useState('');
  

  return (
    <div>
      <PhoneInput
        defaultCountry="ua"
        value={submitData.phone}
        onChange={(phone:string) => setSubmitData((prev:SubmitData) => ({...prev, phone: phone}))}
        hideDropdown={true}
      />
    </div>
  );
};