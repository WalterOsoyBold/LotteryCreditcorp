import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthProvider";
import { Alert, Button, Card, CardActions, CardContent, Collapse, Grid, IconButton, TextField, Typography } from "@mui/material";
import axios from "../api/axios";
import HeaderApp from "./header";
import CloseIcon from '@mui/icons-material/Close';
const allEventsURL = '/event';

const Editor = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [nameEvent, setNameEventr] = useState('');
    const [factorEvent, setFactorEvent] = useState('');
    const [dateEvent, setDateEvent] = useState('');
    const [winnersEvent, setWinnersEvent] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(allEventsURL,
                {
                    "name": nameEvent,
                    "factor": Number(factorEvent),
                    "date": new Date(dateEvent).getTime(),
                    "winners": Number(winnersEvent)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`
                    },

                }
            );
            setOpen(true);
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
    }
    return (
        <React.Fragment>
            <HeaderApp />
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    Evento creado
                </Alert>
            </Collapse>
            <Grid container px={2} py={2} spacing={1} direction={'column'}>
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() => { navigate('/'); }}
                    >
                        Atras
                    </Button>
                </Grid>
                <Grid container direction={'column'} px={1} py={2} spacing={2} style={{ width: '100%' }} align="center" justify="center">
                    <Grid item
                        xs={12}
                    >
                        <TextField
                            required
                            id="name"
                            label="Nombre del evento"
                            variant="filled"
                            type={'text'}
                            style={{ width: '219px' }}
                            onChange={(e) => setNameEventr(e.target.value)}
                        />
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        <TextField
                            required
                            id="factor"
                            label="Factor"
                            variant="filled"
                            type={'number'}
                            style={{ width: '219px' }}
                            onChange={(e) => setFactorEvent(e.target.value)}
                        />
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        <TextField
                            required
                            id="date"
                            variant="filled"
                            type={'date'}
                            style={{ width: '219px' }}
                            onChange={(e) => setDateEvent(e.target.value)}
                        />
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        <TextField
                            required
                            id="winners"
                            label="Cantidad de ganadores"
                            variant="filled"
                            type={'number'}
                            style={{ width: '219px' }}
                            onChange={(e) => setWinnersEvent(e.target.value)}
                        />
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            Crear Evento
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Editor
