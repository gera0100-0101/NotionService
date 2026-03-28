import { Slider } from '@mantine/core'
import "./daySlider.css"
import { useState, useEffect, useContext } from 'react'
import { TimeContext } from './DataTime'

export default function ReadOnlySlider() {
  const [value, setValue] = useState(20);
  const {messages} = useContext(TimeContext);

  // имитация изменения данных
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v + 5) % 100)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const minutes = (messages.hour * 60) + messages.minute;

  return (
    <div>
      <div className='daySlider'>
          <h1>{`${messages.time}:${messages.seconds}`}</h1>
        <Slider
          value={minutes}
          color='#ff096c'
          min={0}
          max={1440}
          disabled
          label={`${value}%`}
          size = 'xl'
          styles={{
            track: {color: '#e64040' },
            bar: {backgroundColor: '#ff096c'},
            thumb: {backgroundColor: '#974c4c'}
          }}

          marks ={[
            {value: 0, label: '00:00'},
            {value: 720, label: '12:00'},
            {value: 1440, label: "24:00"}
          ]}
        />
      </div>
    </div>
  )
}
