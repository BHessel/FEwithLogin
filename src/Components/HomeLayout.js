import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Banner from '../Presentational/Banner'

export const HomeLayout = () => {
    const { user } = useAuth()
    const outlet = useOutlet()

    if (user) {
        return <Navigate to='/VideoContainer' replace />
    }

    return (
        <div>
            <Banner />
            {outlet}
        </div>
    )
}