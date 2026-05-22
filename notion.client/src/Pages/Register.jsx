import { useState, useEffect } from "react"
import "../NotionBlock.css"
import {
  TextInput,
  PasswordInput,
  Button,
  Fieldset
} from "@mantine/core"
import { useNavigate } from "react-router-dom"

export default function Register(){
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    navigate("/login");
  };

  return (
        <form onSubmit={handleSubmit}>
            <Fieldset legend="Login" bg="#192731" radius="xl" className="notionBlock">

                <TextInput
                label="Name"
                placeholder="name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
                />

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