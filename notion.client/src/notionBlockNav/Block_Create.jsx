import "../NotionBlock.css"
import { Fieldset, TextInput, Group, Button, SegmentedControl, Switch, NativeSelect} from '@mantine/core';
import { DateTimePicker, TimeInput } from '@mantine/dates';
import { useState } from 'react';
import '@mantine/dates/styles.css';

export default function NavCreate() {
    const [value, setValue] = useState("notion");
    const token = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [notion_datetime, setNotion_datetime] = useState("");
    const [is_cycle, setIs_cycle] = useState("");
    const [cycle_type, setCycle_type] = useState("");
    const [cycle_time, setCycle_time] = useState("");
    const [day_of_weak, setDay_of_weak] = useState("");
    const [day_of_month, setDay_of_month] = useState("");

    async function handleCreate(){
        const response = await fetch(
            "http://localhost:8001/notion_create",
        {
            method="POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name:name,
                description:description,
                created_at:created_at,
                notion_datetime:notion_datetime,
                is_cycle:is_cycle,
                cycle_type:cycle_type,
                cycle_time:cycle_time,
                day_of_weak:day_of_weak,
                day_of_month:day_of_month
            })
        })
    }

  return (
    <Fieldset onSubmit={handleCreate} legend="Создание" bg="#192731" radius="xl">
        <TextInput label="Наименование" placeholder="Наименование" />
        <TextInput label="Описание" placeholder="Описание" mt="md" />

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

        {value === "notion" && <NotionValue></NotionValue>}
        {value === "deadLine" && <DeadLineValue></DeadLineValue>}
      <Group justify="flex-end" mt="md">
        <Button type="submit" bg="#ff096c">Создать напоминание</Button>
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