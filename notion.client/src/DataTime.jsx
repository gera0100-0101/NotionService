import { HubConnectionBuilder } from "@microsoft/signalr";
import {useState, useEffect} from "react";

export function DataTime(){
    const [time, setTime] = useState(null);

    useEffect(() => {
        let connection = new HubConnectionBuilder()
        .withUrl("http://localhost:32768/timeHub")
        .withAutomaticReconnect()
        .build();

        connection.on("ReceiveTime", (time) => {
            setTime(time)
        });

        const startConnection = async () => {
            try{
            await connection.start();
            await connection.invoke("GetTime", "hello")
            }
            catch(error){
                console.log(error);
            }
        };

        startConnection();

        return () => {
            connection.stop();
        };
    }, []);

    return(
        <div>
            <p>{time}</p>
        </div>
    )
}
