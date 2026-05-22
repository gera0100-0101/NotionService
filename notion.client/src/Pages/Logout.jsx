import { Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { HeaderSimple } from '../Header';

export default function Logout(){
    const navigate = useNavigate();

    function handleSubmit() {
        localStorage.removeItem("token")

        navigate("/login")
    }

    return(
        <div>
            <HeaderSimple></HeaderSimple>
            <form onSubmit={handleSubmit}>
                <h1>Выйти из аккаунта</h1>
                <Button bg="#ff096c"
                    type="submit"
                    mt="md"
                    >
                    Выйти
                </Button>
            </form>
        </div>
    )
}