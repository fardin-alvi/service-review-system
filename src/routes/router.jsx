import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Privateroute from "./Privateroute";
import AddService from "../pages/AddService";
import Services from "../pages/Services";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element:<Home/>

            },
            {
                path: 'login',
                element:<Login/>
            },
            {
                path: 'register',
                element:<Register/>
            },
            {
                path: 'addservice',
                element: <Privateroute>
                    <AddService/>
                </Privateroute>
            },
            {
                path: '/service',
                element:<Services/>
            }
        ]
    }
])

export default router;