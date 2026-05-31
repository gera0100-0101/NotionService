import { Timeline, Text  } from "@mantine/core"
import { IconCheck } from '@tabler/icons-react';
import "../NotionBlock.css"
import ReadOnlySlider from '../DaySlider'
import { useEffect, useState } from "react";

export default function NavNotion(){
    const [notions, setNotions] = useState([])
    const token = localStorage.getItem("token");

    useEffect(() =>{
        fetch("http://localhost:8001/notion_get_all", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setNotions(data);
            console.log(data);
        });
        console.log(notions)
    }, []);

    return(
        <div className='notion'>
            <Timeline active={notions.length} bulletSize={24} lineWidth={2}>
                {notions.map((item) => (
                    <Timeline.Item
                    key={item.id}
                    bullet={<IconCheck size={12} />}
                    title={<Text c="azure" >{item.name}</Text>}
                    >
                    <Text size="sm">{item.description}</Text>
                    <Text c="dimmed" size="xs" mt={4}>
                        {item.notion_datetime}
                    </Text>
                    </Timeline.Item>
                ))}
            </Timeline>
            <div className='notionText'>
                <h1>Напоминание 1</h1>
                <p>Текст или описание для напоминания 1</p>
                <p>Цикличное напоминание: Пн, Чт</p>
            </div>
            <ReadOnlySlider></ReadOnlySlider>
        </div>
    )
}