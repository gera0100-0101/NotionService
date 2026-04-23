import "../NotionBlock.css";
import {
    Fieldset,
    TextInput,
    Group,
    Button,
    SegmentedControl,
    Switch,
    NativeSelect
} from "@mantine/core";

import { DateTimePicker, TimeInput } from "@mantine/dates";
import { useState } from "react";
import "@mantine/dates/styles.css";
import { useCreateNotion } from "../shared/NotionQueries.js";

export default function NavCreate() {
    const createNotion = useCreateNotion();

    const [mode, setMode] = useState("notion");

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [checked, setChecked] = useState(false);

    const [cycleRange, setCycleRange] = useState("DAILY");
    const [weekDayRepeat, setWeekDayRepeat] = useState("MONDAY");
    const [timeRepeat, setTimeRepeat] = useState(null);

    const [onceDate, setOnceDate] = useState(null);
    const [deadlineDate, setDeadlineDate] = useState(null);

    function buildDTO() {
        if (mode === "deadLine") {
            return {
                name,
                notionType: "DEADLINE",
                isCycled: false,
                cycleRange: null,
                weekDayRepeat: null,
                timeRepeat: deadlineDate ? toLocalTime(deadlineDate) : null,
            };
        }

        if (cycleRange === "WEEKLY" && !weekDayRepeat) {
            return null;
        }

        if (!checked) {
            return {
                name,
                notionType: "NOTIFICATION",
                isCycled: false,
                cycleRange: null,
                weekDayRepeat: null,
                timeRepeat: onceDate ? toLocalTime(onceDate) : null,
            };
        }

        return {
            name,
            notionType: "NOTIFICATION",
            isCycled: true,
            cycleRange,
            weekDayRepeat,
            timeRepeat,
        };
    }

    function toLocalTime(date) {
        const d = new Date(date);
        return d.toTimeString().slice(0, 8); // HH:mm:ss для Spring LocalTime
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

            <SegmentedControl
                size="md"
                mt="lg"
                bg="#2a3843"
                color="#ff096c"
                styles={{
                    label: {
                        color: 'white',
                    },
                }}
                value={mode}
                onChange={setMode}
                data={[
                    { label: "Напоминание", value: "notion" },
                    { label: "Дедлайн", value: "deadLine" }
                ]}
            />

            {mode === "notion" && (
                <NotionBlock
                    checked={checked}
                    setChecked={setChecked}
                    cycleRange={cycleRange}
                    setCycleRange={setCycleRange}
                    weekDayRepeat={weekDayRepeat}
                    setWeekDayRepeat={setWeekDayRepeat}
                    timeRepeat={timeRepeat}
                    setTimeRepeat={setTimeRepeat}
                    onceDate={onceDate}
                    setOnceDate={setOnceDate}
                />
            )}

            {mode === "deadLine" && (
                <DateTimePicker
                    label="Выберите дату дедлайна"
                    placeholder="Нажмите что бы выбрать дату"
                    value={deadlineDate}
                    onChange={setDeadlineDate}
                    mt="lg"
                    styles={{
                        calendarHeader: {
                            color: "black"
                        },
                        day: {
                            color: "black"
                        },
                        weekday: {
                            color: '#999',
                        },
                        month: {
                            color: "black",
                        },
                        monthsList: {
                            color: "black"
                        }
                    }}
                />
            )}

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

/* ===================== NOTION ===================== */

function NotionBlock({
                         checked,
                         setChecked,
                         cycleRange,
                         setCycleRange,
                         weekDayRepeat,
                         setWeekDayRepeat,
                         timeRepeat,
                         setTimeRepeat,
                         onceDate,
                         setOnceDate
                     }) {
    return (
        <div>
            <Switch
                mt="lg"
                color="#ff096c"
                checked={checked}
                onChange={(e) => setChecked(e.currentTarget.checked)}
                label="Цикличное напоминание"
            />

            {!checked ? (
                <DateTimePicker
                    label="Выберите дату напоминания"
                    placeholder="Нажмите что бы выбрать дату"
                    value={onceDate}
                    onChange={setOnceDate}
                    mt="lg"
                    styles={{
                        calendarHeader: {
                            color: "black"
                        },
                        day: {
                            color: "black"
                        },
                        weekday: {
                            color: '#999',
                        },
                        month: {
                            color: "black",
                        },
                        monthsList: {
                            color: "black"
                        }
                    }}
                />
            ) : (
                <CycleBlock
                    cycleRange={cycleRange}
                    setCycleRange={setCycleRange}
                    weekDayRepeat={weekDayRepeat}
                    setWeekDayRepeat={setWeekDayRepeat}
                    timeRepeat={timeRepeat}
                    setTimeRepeat={setTimeRepeat}
                />
            )}
        </div>
    );
}

/* ===================== CYCLE ===================== */

function CycleBlock({
                        cycleRange,
                        setCycleRange,
                        weekDayRepeat,
                        setWeekDayRepeat,
                        timeRepeat,
                        setTimeRepeat
                    }) {
    const days = Array.from({ length: 31 }, (_, i) => ({
        value: String(i + 1),
        label: String(i + 1),
    }));

    return (
        <div>
            <SegmentedControl
                size="md"
                mt="lg"
                bg="#2a3843"
                color="#ff096c"
                styles={{
                    label: {
                        color: 'white',
                    },
                }}
                value={cycleRange}
                onChange={setCycleRange}
                data={[
                    { label: "Ежедневно", value: "DAILY" },
                    { label: "Еженедельно", value: "WEEKLY" },
                    { label: "Ежемесячно", value: "MONTHLY" }
                ]}
            />

            {cycleRange === "DAILY" && (
                <TimeInput
                    mt="lg"
                    label="Введите время"
                    value={timeRepeat}
                    onChange={(e) => setTimeRepeat(e.currentTarget.value)}
                />
            )}

            {cycleRange === "WEEKLY" && (
                <>
                    <NativeSelect
                        mt="lg"
                        label="Выберите день недели"
                        value={weekDayRepeat}
                        onChange={(e) => setWeekDayRepeat(e.currentTarget.value)}
                        data={[
                            { value: "MONDAY", label: "Понедельник" },
                            { value: "TUESDAY", label: "Вторник" },
                            { value: "WEDNESDAY", label: "Среда" },
                            { value: "THURSDAY", label: "Четверг" },
                            { value: "FRIDAY", label: "Пятница" },
                            { value: "SATURDAY", label: "Суббота" },
                            { value: "SUNDAY", label: "Воскресенье" }
                        ]}
                    />

                    <TimeInput
                        mt="lg"
                        label="Введите время"
                        value={timeRepeat}
                        onChange={(e) => setTimeRepeat(e.currentTarget.value)}
                    />
                </>
            )}

            {cycleRange === "MONTHLY" && (
                <>
                    <NativeSelect
                        mt="lg"
                        label="Выберите день месяца"
                        value={weekDayRepeat}
                        onChange={(e) => setWeekDayRepeat(e.currentTarget.value)}
                        data={days}
                    />

                    <TimeInput
                        mt="lg"
                        label="Введите время"
                        value={timeRepeat}
                        onChange={(e) => setTimeRepeat(e.currentTarget.value)}
                    />
                </>
            )}
        </div>
    );
}