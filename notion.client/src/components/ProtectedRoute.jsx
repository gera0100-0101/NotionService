import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  
  useEffect(() => {
    async function request() {
        const token = localStorage.getItem("token");

        if (!token || token === "undefined") {
            setIsAuth(false);
            return;
        }

        try{
            const response = await fetch("http://localhost:8001/user_checkout",{
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },

                body: token,
            })

            const data = await response.text()

            console.log(data)

            if(response.ok && data === "true"){
                setIsAuth(true)
            }
            else{
                setIsAuth(false)
            }
        }
        catch(error){
            console.log(error)
            setIsAuth(false)
        }
    }

    request();
  }, [])

  console.log(isAuth)

  if(isAuth === null){
    return<h1>Loading...</h1>
  }

  if(!isAuth){
    return <Navigate to="/login" replace />;
  }

  return children;
}