import "../NotionBlock.css"
import { Progress, Group, Box, Text } from '@mantine/core';

export default function NavDeadline(){
    return(
        <div>
            <div>
                <h1>Дедлайн до проекта</h1>
                <p>Осталось 4 дня</p>
                <Group grow gap={5} mt="xs">
                    
                    <Box style={{ minHeight: 40 }}>
                        <Progress.Root style={{ transform: 'scaleX(-1)' }}>
                        <Progress.Section size="xs" color="red" value={10} animated />
                        </Progress.Root>
                        <Text size="xs" ta="center">27 Февраля</Text>
                    </Box>

                    <Box style={{ minHeight: 40 }}>
                        <Progress.Root style={{ transform: 'scaleX(-1)' }}>
                        <Progress.Section size="xs" color="blue" value={100} />
                        </Progress.Root>
                        <Text size="xs" ta="center"></Text>
                    </Box>

                    <Box style={{ minHeight: 40 }}>
                        <Progress.Root style={{ transform: 'scaleX(-1)' }}>
                        <Progress.Section size="xs" color="blue" value={100} />
                        </Progress.Root>
                        <Text size="xs" ta="center"></Text>
                    </Box>

                    <Box style={{ minHeight: 40 }}>
                        <Progress.Root style={{ transform: 'scaleX(-1)' }}>
                        <Progress.Section size="xs" color="blue" value={100} />
                        </Progress.Root>
                        <Text size="xs" ta="center">30 Февраля</Text>
                    </Box>
                </Group>
            </div>

            <div>
                <h1>Дедлайн до зачета по статистике</h1>
                <p>Осталось 2 дня</p>
                <Group grow gap={5} mt="xs">
                    
                    <Box style={{ minHeight: 40 }}>
                        <Progress.Root style={{ transform: 'scaleX(-1)' }}>
                        <Progress.Section size="xs" color="red" value={10} animated />
                        </Progress.Root>
                        <Text size="xs" ta="center">27 Февраля</Text>
                    </Box>

                    <Box style={{ minHeight: 40 }}>
                        <Progress.Root style={{ transform: 'scaleX(-1)' }}>
                        <Progress.Section size="xs" color="blue" value={100} />
                        </Progress.Root>
                        <Text size="xs" ta="center">28 Февраля</Text>
                    </Box>
                </Group>
            </div>
        </div>
    )
}