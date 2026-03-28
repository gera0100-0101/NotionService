import { Tabs } from "@mantine/core"
import NavNotion from "./notionBlockNav/Block_Notion"
import NavDeadline from "./notionBlockNav/Block_DeadLine"
import NavCreate from "./notionBlockNav/Block_Create"
import "./NotionBlock.css"

export default function NotionBlock(){
    return(
        <div className="notionBlock">
            <div className="notionNavi">
                <Tabs variant="pills" defaultValue="gallery" color='#ff096c'>
                    <Tabs.List justify="center">
                        <Tabs.Tab value="gallery" className="tabButton">
                        Напоминания
                        </Tabs.Tab>
                        <Tabs.Tab value="messages" className="tabButton">
                        Дедлайны
                        </Tabs.Tab>
                        <Tabs.Tab value="settings" className="tabButton">
                        Создать
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="gallery" className="block">
                        <NavNotion></NavNotion>
                    </Tabs.Panel>

                    <Tabs.Panel value="messages" className="block">
                        <NavDeadline></NavDeadline>
                    </Tabs.Panel>

                    <Tabs.Panel value="settings" className="block">
                        <NavCreate></NavCreate>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    )
}