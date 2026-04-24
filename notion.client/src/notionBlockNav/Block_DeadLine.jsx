import "../NotionBlock.css"
import { Progress, Group, Box, Text } from '@mantine/core';
import { useNotions } from "../shared/NotionQueries.js";
import { TimeContext } from '../DataTime'
import { useState, useEffect, useContext, useMemo} from 'react'

export default function NavDeadline(){
    const notions = useNotions();
    const {messages} = useContext(TimeContext);

    const now = new Date(messages.dateTime);
    const startDate = new Date("2026-04-20");

    const deadlinesList = useMemo(() => {
        return (notions?.data || []).filter(
            n => n.notionType === "DEADLINE"
        );
    }, [notions?.data]);

    const daysBetween = (a, b) => {
        const msPerDay = 1000 * 60 * 60 * 24;
        return Math.ceil((b - a) / msPerDay);
    };

    console.log(startDate);
    console.log(now);

    return (
        <div>
            {deadlinesList.map((d, index) => {
                const deadlineDate = new Date(d.targetDate);

                const totalDays = daysBetween(startDate, deadlineDate);
                const daysLeft = daysBetween(now, deadlineDate);
                console.log(deadlineDate);
                const progress =
                    totalDays > 0
                        ? Math.max(0, Math.min(100, ((totalDays - daysLeft) / totalDays) * 100))
                        : 0;

                return (
                    <div key={d.id || index}>
                        <h1>{d.name}</h1>

                        <p>
                            Осталось {daysLeft > 0 ? daysLeft : 0} дней
                        </p>

                        <Group grow gap={5} mt="xs">
                            <Box style={{ minHeight: 40 }}>
                                <Progress.Root>
                                    <Progress.Section
                                        size="xs"
                                        color={daysLeft <= 3 ? "red" : "blue"}
                                        value={progress}
                                        animated={daysLeft <= 3}
                                    />
                                </Progress.Root>

                                <Text size="xs" ta="center">
                                    {deadlineDate.toLocaleDateString("ru-RU")}
                                </Text>
                            </Box>
                        </Group>
                    </div>
                );
            })}
        </div>
    );
}