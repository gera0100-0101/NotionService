import { useState, useEffect } from "react"
import "../NotionBlock.css"
import {
  TextInput,
  PasswordInput,
  Button,
  Fieldset
} from "@mantine/core"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const token = localStorage.getItem(
            "token"
        )
        console.log(token)
    }, [])

    async function handleLogin(e) {
        e.preventDefault()

        const response = await fetch(
        "http://localhost:8001/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()
        console.log(data)
        localStorage.setItem("token", data.access_token)
    }


    return (
        <form onSubmit={handleLogin}>
        <Fieldset legend="Login" bg="#192731" radius="xl" className="notionBlock">

            <TextInput
            label="Email"
            placeholder="email"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            />

            <PasswordInput
            label="Password"
            placeholder="password"
            value={password}
            onChange={(e) =>
                setPassword(e.target.value)
            }
            />

            <Button bg="#ff096c"
            type="submit"
            mt="md"
            >
            Login
            </Button>

        </Fieldset>
        </form>
    )
}