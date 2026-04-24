import { Stepper } from "@mantine/core"
import "../NotionBlock.css"
import ReadOnlySlider from '../DaySlider'
import { useNotions } from "../shared/NotionQueries.js";
import { useState, useEffect, useContext, useMemo} from 'react'
import { TimeContext } from '../DataTime'

export default function NavNotion(){
    const [currentNotions, setCurrentNotions] = useState();

    const notions = useNotions();
    const {messages} = useContext(TimeContext);

    const notionList = useMemo(() => {
        return (notions?.data || []).filter(
        n => n.notionType === "NOTIFICATION"
        );
    }, [notions?.data]);
    
    const toMinutes = (t) => {
        if (typeof t !== "string") return null;

        const parts = t.split(":");
        if (parts.length < 2) return null;

        const [h, m] = parts.map(Number);

        if (Number.isNaN(h) || Number.isNaN(m)) return null;

        return h * 60 + m;
    };
    
    function getNotionsByTime(notions, currentTime) {
        const now = toMinutes(currentTime);
        const sorted = notions
            .map(n => ({
            ...n,
            minutes: toMinutes(n.timeRepeat),
            }))
            .sort((a, b) => a.minutes - b.minutes);

        let past = null;
        let next = null;
        let afterNext = null;

        for (let i = 0; i < sorted.length; i++) {
            if (sorted[i].minutes <= now) {
            past = sorted[i];
            }

            if (sorted[i].minutes > now && !next) {
            next = sorted[i];
            afterNext = sorted[i + 1] || null;
            }
        }

        return {
            past,
            next,
            afterNext,
        };
    }

    useEffect(() => {
        if (notionList && messages.time) {
            const result = getNotionsByTime(notionList, messages.time);
            setCurrentNotions(result);
        }
    }, [notionList, messages?.time]);

    if (!notions?.data) {
        return <p>Загрузка...</p>;
    }

    if (!currentNotions) {
        return <p>Нет данных</p>;
    }


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
                    <Stepper.Step label={currentNotions.afterNext?.timeRepeat || "-"} description={currentNotions.afterNext?.name || "-"} />
                    <Stepper.Step label={currentNotions.next?.timeRepeat || "-"} description={currentNotions.next?.name || "-"} />
                    <Stepper.Step label={currentNotions.past?.timeRepeat || "-"} description={currentNotions.past?.name || "-"} />
                </Stepper>
                <div className='notionText'>
                    <h1>{currentNotions.next?.name || "-"}</h1>
                    <p>Текст или описание для напоминания 1</p>
                    {currentNotions.isCycled ? <p>Цикличное напоминание: {currentNotions.weekDayRepeat}</p> : <p>Обычное напоминание</p>}
                </div>
                <ReadOnlySlider></ReadOnlySlider>
            </div>
        )
}