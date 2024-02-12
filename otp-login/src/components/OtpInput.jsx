import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({ length = 4, onOtpSubmit = () => { } }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""))

    const inputRefs = useRef([])

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [])



    const handleChange = (index, e) => {
        const value = e.target.value;
        console.log(value, 'value in change')
        if (isNaN(value)) {
            return;
        }
        const newOtp = [...otp]
        //allow only one input
        newOtp[index] = value.substring(value.length - 1)
        console.log(newOtp, 'otp')
        setOtp(newOtp)
    }
    const handleClick = () => { }
    const handleKeyDown = () => {

    }
    return <div>
        {otp.length}
        {otp.map((value, index) => {
            return (

                <input
                    key={index}
                    ref={(input) => (inputRefs.current[index] = input)}
                    type='text'
                    value={value}
                    onChange={(e) => { handleChange(index, e) }}
                    onClick={() => { handleClick(index) }}
                    onKeyDown={(e) => { handleKeyDown(index, e) }}
                    className='otpInput' />
            )
        }

        )}
    </div>
}

export default OtpInput