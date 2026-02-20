import { Slider } from '@mantine/core'
import { useState, useEffect } from 'react'

export default function ReadOnlySlider() {
  const [value, setValue] = useState(20)

  // имитация изменения данных
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v + 5) % 100)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Slider
      value={2}
      min={0}
      max={24}
      disabled   // ← пользователь не может менять
      label={`${value}%`}
      styles={{
        rail: { backgroundColor: '#08e26a' },
        track: { backgroundColor: '#4c6ef5' },
      }}
    />
  )
}
