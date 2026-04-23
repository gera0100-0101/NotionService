import "../NotionBlock.css"
import { Fieldset, TextInput, Group, Button, SegmentedControl, Switch, NativeSelect} from '@mantine/core';
import { DateTimePicker, TimeInput } from '@mantine/dates';
import { useState } from 'react';
import '@mantine/dates/styles.css';
import {useCreateNotion} from "../shared/NotionQueries.js";

export default function NavCreate() {
    const [value, setValue] = useState("notion");
    const createNotion = useCreateNotion();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [checked, setChecked] = useState(false);
    const [loopType, setLoopType] = useState("everyDay");
    const [weekDay, setWeekDay] = useState(null);
    const [time, setTime] = useState(null);

    function buildDTO() {
        if (value === "deadLine") {
            return {
                name,
                notionType: "DEADLINE",
                isCycled: false,
                timeRepeat: null,
                cycleRange: null,
                weekDayRepeat: null,
            };
        }

        if (value === "notion") {
            if (!checked) {
                return {
                    name,
                    notionType: "NOTIFICATION",
                    isCycled: false,
                    timeRepeat: null,
                    cycleRange: null,
                    weekDayRepeat: null,
                };
            }

            return {
                name,
                notionType: "NOTIFICATION",
                isCycled: true,
                cycleRange: loopType?.toUpperCase(), // DAILY / WEEKLY / MONTHLY
                weekDayRepeat: weekDay,
                timeRepeat: time,
            };
        }
    }

  return (
    <Fieldset legend="Создание" bg="#192731" radius="xl">
        <TextInput
            label="Наименование"
            placeholder="Наименование"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
        />

        <TextInput
            label="Описание"
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
        />

        <SegmentedControl size="md" mt="lg" bg="#2a3843" color="#ff096c"
            styles={{
                label: {
                color: 'white',
                },
            }}
            value={value}
            onChange={setValue}
            data={[
                {label: "Напоминание", value: "notion"},
                {label: "Дедлайн", value: "deadLine"}
                ]} 
        />

        {value === "notion" &&
            <NotionValue
                checked={checked}
                setChecked={setChecked}
                loopType={loopType}
                setLoopType={setLoopType}
                weekDay={weekDay}
                setWeekDay={setWeekDay}
                time={time}
                setTime={setTime}
            />
        }
        {value === "deadLine" && <DeadLineValue></DeadLineValue>}
      <Group justify="flex-end" mt="md">
          <Button
              bg="#ff096c"
              onClick={() => {
                  const dto = buildDTO();
                  createNotion.mutate(dto);
              }}
          >
              Создать напоминание
          </Button>
      </Group>
    </Fieldset>
  );
}

function NotionValue(){
    const [checked, setChecked] = useState(false);

    return(
        <div>
            <Switch mt="lg" color="#ff096c"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                label="Цикличное напоминание"
            />

            {checked === false && <OnceNotion></OnceNotion>}
            {checked === true && <LoopNotion></LoopNotion>}

        </div>
    )
}

function OnceNotion(){
    return(
        <DateTimePicker label="Выберите дату напоминания" placeholder="Нажмите что бы выбрать дату" mt="lg"
            styles={{
                calendarHeader:{
                    color: "black"
                },
                day:{
                    color: "black"
                },
                weekday: {
                    color: '#999',
                },
                month:{
                    color: "black",
                },
                monthsList:{
                    color: "black"
                }
            }}
        />
    )
}

function LoopNotion(){
    const [value, setValue] = useState("everyDay");
    const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
    }));
    
    return(
        <div>
            <SegmentedControl size="md" mt="lg" bg="#2a3843" color="#ff096c"
            styles={{
                label: {
                color: 'white',
                },
            }}
            value={value}
            onChange={setValue}
            data={[
                {label: "Ежедневно", value: "everyDay"},
                {label: "Еженедельно", value: "everyWeek"},
                {label: "Ежемесячно", value: "everyMonth"}
                ]} 
        />

        {value === "everyDay" && 
            <TimeInput mt="lg"
            label="Введите время"
            />
        }
        {value === "everyWeek" &&
            <div>
                <NativeSelect label="Выберите день недели" mt="lg"
                data={['Понедельник', 'Вторник', 'Среда', "Четверг", "Пятница", "Суббота", "Воскресенье"]} 
                />
                <TimeInput mt="lg"
                label="Введите время"
                />
            </div>
        }
        {value === "everyMonth" &&
            <div>
                <NativeSelect label="Выберите день месяца" mt="lg"
                data={days} 
                />
                <TimeInput mt="lg"
                label="Введите время"
                />
            </div>
        }
        </div>
    )
}



function DeadLineValue(){
    return(
        <DateTimePicker label="Выберите дату дедлайна" placeholder="Нажмите что бы выбрать дату" mt="lg"
            styles={{
                calendarHeader:{
                    color: "black"
                },
                day:{
                    color: "black"
                },
                weekday: {
                    color: '#999',
                },
                month:{
                    color: "black",
                },
                monthsList:{
                    color: "black"
                }
            }}
        />
    )
}
