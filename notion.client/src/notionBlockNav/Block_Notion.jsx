import { Stepper } from "@mantine/core"
import "../NotionBlock.css"
import ReadOnlySlider from '../DaySlider'

export default function NavNotion(){
    return(
        <div className='notion'>
            <Stepper active={1} orientation="vertical" color='#ff096c' size="lg"
                styles={{
                    separator: {
                    borderTopWidth: '3px !important',
                    height: 30,
                    },

                    stepLabel: {
                    fontSize: 18,
                    color: 'azure'
                    },
                }}
                >
                <Stepper.Step label="7:00" description="Напоминание 0" />
                <Stepper.Step label="16:30" description="Напоминание 1" />
                <Stepper.Step label="22:00" description="Напоминание 2" />
            </Stepper>
            <div className='notionText'>
                <h1>Напоминание 1</h1>
                <p>Текст или описание для напоминания 1</p>
                <p>Цикличное напоминание: Пн, Чт</p>
            </div>
            <ReadOnlySlider></ReadOnlySlider>
        </div>
    )
}