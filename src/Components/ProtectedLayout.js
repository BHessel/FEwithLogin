import React from 'react';
import { Link, Navigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Banner from '../Presentational/Banner';

export const ProtectedLayout = () => {
    const { user } = useAuth()
    const outlet = useOutlet()

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div>
            <Banner />
            {outlet}
        </div>
    )
}

