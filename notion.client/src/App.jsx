import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {HeaderSimple} from './Header';
import CalendarPage from './Pages/CalendarPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <HeaderSimple></HeaderSimple>
      <CalendarPage></CalendarPage>
    </div>
  )
}

export default App
