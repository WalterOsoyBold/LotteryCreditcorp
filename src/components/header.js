import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Logo } from '../assests/Logo-menu-Credicorp.svg';

const allEventsURL = '/event/all';

const HeaderApp = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {
        setAuth({});
        navigate('/login');
    }

    return (
        <React.Fragment>
            <Grid container style={{padding:'10px 15px 10px 15px'}}>
                <Grid item xs={6} align={'left'}>
                    <Logo />
                </Grid>
                <Grid item xs={6} align={'right'}>
                    <Button
                        variant="outlined"
                        onClick={logout}
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
export default HeaderApp;