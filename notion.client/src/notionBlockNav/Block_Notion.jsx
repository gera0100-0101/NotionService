import { Timeline, Text  } from "@mantine/core"
import { IconCheck } from '@tabler/icons-react';
import "../NotionBlock.css"
import ReadOnlySlider from '../DaySlider'
import { useEffect, useState } from "react";
import { TimeContext } from "../DataTime";
import { useContext } from "react";

export default function NavNotion(){
    const [notions, setNotions] = useState([])
    const [notionsList, setNotionsList] = useState([])
    const token = localStorage.getItem("token");
    const {messages} = useContext(TimeContext);

    useEffect(() =>{
        fetch("http://localhost:8001/notion_get_all", {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
        .then((res) => res.json())
        .then((data) => setNotions(data));
    }, []);

    useEffect(() => {
        console.log("notions изменились:", notions);

        const list = notions
        .filter(
            notion => new Date(notion.notion_datetime) > messages?.dateTime
        )
        .sort(
            (a, b) =>
                new Date(a.notion_datetime) -
                new Date(b.notion_datetime)
        );

        setNotionsList(list);
    }, [notions]);

    function get_difference(dateNotion, dateTime){
        const diffMs = (new Date(dateNotion) - new Date(dateTime));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        if(hours > 24){
            return `осталось ${days} дней`;
        }
        else{
            return `осталось ${hours}ч ${minutes}м`;
        }
    }

    return(
        <div className='notion'>
            <Timeline color="#ff096c" active={0} bulletSize={24} lineWidth={2}>
                {notionsList.map((item) => (
                    <Timeline.Item
                    key={item.id}
                    bullet={<IconCheck size={12} />}
                    title={<Text c="azure" >{item.name}</Text>}
                    >
                    <Text size="sm">{item.description}</Text>
                    <Text c="dimmed" size="xs" mt={4}>
                        {get_difference(item?.notion_datetime, messages?.dateTime)}
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