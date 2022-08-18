import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import axios from "../api/axios";
import HeaderApp from "./header";
import { formatDate } from "../utils/dateUtils";
const allEventsURL = '/event/all';
const Home = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [events, setEvents] = useState(null);
    const [errMsg, setErrMsg] = useState('');

    useEffect(async () => {
        try {
            const response = await axios.get(allEventsURL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`
                    },
                }
            )
            setEvents(response.data.data)
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
        }
    }, [])
    return (
        <React.Fragment>
            <HeaderApp />
            {events == null && (
                <Grid container>
                    <Grid item xs={12} align={'center'}>
                        <Card sx={{ maxWidth: 345 }} variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Tombola
                                </Typography>
                                <Typography variant="h5" component="div">
                                    Sin Eventos
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    No existen eventos creados.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    onClick={() => { navigate('/editor'); }}
                                >
                                    Crear Evento
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            )}
            {events != null && (
                <Grid container direction={'column'} spacing={2} px={2}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => { navigate('/editor'); }}
                        >
                            Crear Evento
                        </Button>
                    </Grid>
                    <Grid item>
                        <Grid container direction={'row'} spacing={2}>
                            {events.map((item) => (
                                <Grid item key={item.id}>
                                    <Card sx={{ maxWidth: 345 }} variant="outlined">
                                        <CardContent>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Tombola
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                Fecha: {formatDate(item.date)} <br />
                                                Cantidad ganadores: {item.winners}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => { navigate('/winners',{state: item}); }}
                                            >
                                                Jugar evento
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    )
}

export default Home;