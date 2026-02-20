import { Grid, Box, Text } from '@mantine/core'
import { Calendar } from '@mantine/dates'
import ReadOnlySlider from '../DaySlider'
import {DataTime} from '../DataTime'

export default function CalendarPage() {
  return (
    <div>
    <ReadOnlySlider></ReadOnlySlider>
    <DataTime></DataTime>
    </div>
  )
}