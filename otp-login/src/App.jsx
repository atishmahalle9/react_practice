import { useState } from 'react'
import PhoneOtpForm from './components/PhoneLogin'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>Login with phone</div>
      <PhoneOtpForm></PhoneOtpForm>
    </>
  )
}

export default App
