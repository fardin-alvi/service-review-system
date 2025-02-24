import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Privateroute from "./Privateroute";
import AddService from "../pages/AddService";
import Services from "../pages/Services";
import ServiceDetails from "../components/ServiceDetails";
import Myservice from "../pages/Myservice";
import Myreview from "../pages/Myreview";
import Error from "../pages/Error";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />

            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'addservice',
                element: <Privateroute>
                    <AddService />
                </Privateroute>
            },
            {
                path: '/service',
                element: <Services />
            },
            {
                path: '/servicedetails/:id',
                element: <ServiceDetails />,
                loader: ({ params }) => fetch(`https://deck-serve-server.vercel.app/services/${params.id}`)

            },
            {
                path: 'myservice',
                element: <Privateroute>
                    <Myservice />
                </Privateroute>
            },
            {
                path: 'myreview',
                element: <Privateroute>
                    <Myreview />
                </Privateroute>
            }
        ]
    }
])

export default router;