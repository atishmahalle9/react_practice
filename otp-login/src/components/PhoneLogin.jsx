import React, { useState } from 'react'
import OtpInput from './OtpInput'

const PhoneOtpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showOtpInput, setShowOtpInput] = useState(false)

    const handlePhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
    };

    const handlePhoneSubmit = (event) => {
        event.preventDefault();
        console.log('inside sub,it')
        //phone validations
        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert('invalid phone number');
            return;
        }
        else {
            setShowOtpInput(true)
        }
    }

    const onOtpSubmit = (otp) => {
        console.log(otp, 'otp')
    }

    return (
        <div> {!showOtpInput ?
            <form onSubmit={handlePhoneSubmit}>
                <input type="text" value={phoneNumber} onChange={handlePhoneNumber} placeholder='Enter Phone number' />
                <button type='submit'>Submit</button>
            </form> : <div>
                <p>Enter Otp sent by number{phoneNumber}</p>
                <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
            </div>
        }
        </div>
    )
}

export default PhoneOtpForm