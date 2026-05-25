import "../NotionBlock.css"
import { Fieldset, TextInput, Group, Button, SegmentedControl, Switch, NativeSelect} from '@mantine/core';
import { DateTimePicker, TimeInput } from '@mantine/dates';
import { useState } from 'react';
import { create } from "zustand"
import '@mantine/dates/styles.css';

export const useStore = create((set) => ({
    is_cycle: false, setIs_cycle: (value) => set({is_cycle: value}),
    notion_datetime: "", setNotion_datetime: (value) => set({notion_datetime: value}),
    cycle_type: "", setCycle_type: (value) => set({cycle_type: value}),
    cycle_time: "", setCycle_time: (value) => set({ cycle_time: value || "" }),
    day_of_weak: "", setDay_of_weak: (value) => set({day_of_weak: value}),
    day_of_month: "", setDay_of_month: (value) => set({day_of_month: value}),
}))

export default function NavCreate() {
    const [value, setValue] = useState("notion");
    const token = localStorage.getItem("token");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const notion_datetime = useStore((state) => state.notion_datetime)
    const is_cycle = useStore((state) => state.is_cycle)
    
    const cycle_type = useStore((state) => state.cycle_type)
    const setCycle_type = useStore((state) => state.setCycle_type)
    const cycle_time = useStore((state) => state.cycle_time)
    const setCycle_time = useStore((state) => state.setCycle_time)
    const day_of_weak = useStore((state) => state.day_of_weak)
    const setDay_of_weak = useStore((state) => state.setDay_of_weak)
    const day_of_month = useStore((state) => state.day_of_month)
    const setDay_of_month = useStore((state) => state.setDay_of_month)

    async function notion_handleCreate(){
        
        const body = {
            name,
            description,
            notion_datetime,
            is_cycle,
            cycle_type: cycle_type || null,
            cycle_time: cycle_time || null,
            day_of_weak: day_of_weak || null,
            day_of_month: day_of_month || null,
        };

        const response = await fetch(
            "http://localhost:8001/notion_create",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
    }

    async function deadLine_handleCreate() {
        const response = await fetch(
            "http://localhost:8001/deadline_create",
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            // body: JSON.stringify({
            //     name:name,
            //     description:description,
            //     created_at:created_at,
            //     notion_datetime:notion_datetime,
            //     is_cycle:is_cycle,
            //     cycle_type:cycle_type,
            //     cycle_time:cycle_time,
            //     day_of_weak:day_of_weak,
            //     day_of_month:day_of_month
            // })
        })
    }

  return (
    <Fieldset legend="Создание" bg="#192731" radius="xl">
        <TextInput label="Наименование" value={name} onChange={(e) => setName(e.target.value)} placeholder="Наименование" />
        <TextInput label="Описание" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" mt="md" />

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
        <Button bg="#ff096c"
        onClick={() => {
            if(value === "notion"){
                notion_handleCreate()
            }
            else if(value === "deadLine"){
                deadLine_handleCreate()
            }
        }}
        >Создать напоминание</Button>
      </Group>
    </Fieldset>
  );
}

function NotionValue(){
    const is_cycle = useStore((state) => state.is_cycle)
    const setIs_cycle = useStore((state) => state.setIs_cycle)

    return(
        <div>
            <Switch mt="lg" color="#ff096c"
                checked={is_cycle}
                onChange={(event) => setIs_cycle(event.currentTarget.checked)}
                label="Цикличное напоминание"
            />

            {is_cycle === false && <OnceNotion></OnceNotion>}
            {is_cycle === true && <LoopNotion></LoopNotion>}

        </div>
    )
}

function OnceNotion(){
    const notion_datetime = useStore((state) => state.notion_datetime)
    const setNotion_datetime = useStore((state) => state.setNotion_datetime)

    return(
        <DateTimePicker label="Выберите дату напоминания" placeholder="Нажмите что бы выбрать дату" mt="lg"
            value={notion_datetime}
            onChange={setNotion_datetime}
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
    // const [value, setValue] = useState("everyDay");
    const cycle_type = useStore((state) => state.cycle_type)
    const setCycle_type = useStore((state) => state.setCycle_type)
    const cycle_time = useStore((state) => state.cycle_time)
    const setCycle_time = useStore((state) => state.setCycle_time)
    const day_of_weak = useStore((state) => state.day_of_weak)
    const setDay_of_weak = useStore((state) => state.setDay_of_weak)
    const day_of_month = useStore((state) => state.day_of_month)
    const setDay_of_month = useStore((state) => state.setDay_of_month)

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
            value={cycle_type || ""}
            onChange={(v) => setCycle_type(v)}
            data={[
                {label: "Ежедневно", value: "everyday"},
                {label: "Еженедельно", value: "everyweek"},
                {label: "Ежемесячно", value: "everymonth"}
                ]} 
        />

        {cycle_type === "everyday" && 
            <TimeInput mt="lg"
            value={cycle_time || ""}
            onChange={(value) => {
                const time = value ? value.toTimeString().slice(0, 5) : "";
                setCycle_time(time);
            }}
            label="Введите время"
            />
        }
        {cycle_type === "everyweek" &&
            <div>
                <NativeSelect label="Выберите день недели" mt="lg"
                value={day_of_weak || ""}
                onChange={(event) => setDay_of_weak(event.currentTarget.value)}
                data={['Понедельник', 'Вторник', 'Среда', "Четверг", "Пятница", "Суббота", "Воскресенье"]} 
                />
                <TimeInput mt="lg"
                value={cycle_time || ""}
                onChange={(value) => {
                    const time = value ? value.toTimeString().slice(0, 5) : "";
                    setCycle_time(time);
                }}
                label="Введите время"
                />
            </div>
        }
        {cycle_type === "everymonth" &&
            <div>
                <NativeSelect label="Выберите день месяца" mt="lg"
                value={day_of_month || ""}
                onChange={(event) => setDay_of_month(event.currentTarget.value)}
                data={days} 
                />
                <TimeInput mt="lg"
                value={cycle_time || ""}
                onChange={(value) => {
                    const time = value ? value.toTimeString().slice(0, 5) : "";
                    setCycle_time(time);
                }}
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