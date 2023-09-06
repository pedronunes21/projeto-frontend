import { useState, useEffect } from 'react'
import Cookies from "js-cookie"
import { Route } from 'react-router-dom';
import { ScreenLoading } from '../components/loading';
import { ErrorPage } from '../components/error';
import api from '../service/api';

const PrivateRoute = ({ component, path }: {
    component: () => JSX.Element;
    path: string
}) => {
    const [element, setElement] = useState(() => ScreenLoading);

    const validateUser = async () => {
        try {
            await api.get("/auth/token", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            })
            setElement(() => component)
        } catch (err: any) {
            console.log(err.response.data)
            setTimeout(() => {
                window.location.replace("/entrar")
            }, 1000)
            setElement(() => ErrorPage)
        }
    }

    useEffect(() => {
        validateUser()
    }, [])

    return <Route component={element} path={path} exact />
}

export default PrivateRoute;