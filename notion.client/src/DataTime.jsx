import {createContext, useState, useEffect} from "react";

export const TimeContext = createContext();

export function DataTime({children}){
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("http://127.0.0.1:8000/ws")

        socket.onopen = () => {
            console.log("connected");
        };

        socket.onmessage = (event) => {
            setMessages(JSON.parse(event.data));
        };

        socket.onclose = () => {
            console.log("disconnected");
        };

        setWs(socket);

        return () => socket.close();
    }, []);

    return(
        <TimeContext.Provider value={{messages}}>
            {children}
        </TimeContext.Provider>
    )
}
