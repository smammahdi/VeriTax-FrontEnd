import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from '../api/axios';

const RequireAuth = ({ children }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const  navigate  = useNavigate();

    useEffect(async () => {
        try {
            const response = await axios.post('/auth',
                JSON.stringify({}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setAuth({user: response.data.id});
        } catch (err) {
            setAuth({});
            navigate('/login');
        }
    }, []);

    return children;
}

export default RequireAuth;