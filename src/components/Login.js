import React, { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
import { Button, Grid, Paper, TextField } from '@mui/material';
import Image from '../assests/EdificioLogin.jpg';
const LOGIN_URL = '/auth/login';
const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                { 'email': user, 'password': pwd },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const accessToken = response?.data?.token;
            setAuth({ user, pwd, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <React.Fragment>
            <Grid container style={{ width: '100%', height: '100%', margin: '0px', padding: '0px' }} align="center" justify="center">
                <Grid item xs={5} style={{ width: '100%', height: '100%' }} >
                    <img src={Image} alt="" style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '100%', height: '100%' }} />
                </Grid>
                <Grid item xs={7} style={{marginTop:'15%'}}>
                    <Grid container spacing={2}>
                        <Grid item
                            xs={12}
                        >
                            <TextField
                                required
                                id="username"
                                label="UserName or Email"
                                variant="filled"
                                type={'text'}
                                ref={userRef}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </Grid>
                        <Grid item
                            xs={12}
                        >
                            <TextField
                                required
                                id="password"
                                label="Password"
                                variant="filled"
                                type={'password'}
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </Grid>
                        <Grid item
                            xs={12}
                        >
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Login
