import axios from "../api/axios";
import HeaderApp from "./header";
import AuthContext from "../context/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Alert, Button, Card, CardActions, CardContent, CircularProgress, Collapse, Grid, IconButton, TextField, Typography } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import { Stack } from "@mui/system";

const generateOpportunities = '/attempt/generate';
const getWinners = '/balance/Winners';

const Lounge = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [errMsg, setErrMsg] = useState('');
    const { auth, setAuth } = useContext(AuthContext);
    const [raffleWinners, setRaffleWinners] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const { date, factor, id, name, winners } = state;

    useEffect(async () => {
        try {
            setLoading(true)
            setRaffleWinners(null)
            const raffle = await axios.post(getWinners,
                {
                    "evt": {
                        "id": `${id}`,
                        "name": `${name}`,
                        "factor": Number(factor),
                        "date": Number(date),
                        "winners": Number(winners),
                    },
                    "name": `${name}`,
                    "prize": {
                        "id": "",
                        "name": "",
                        "event": {
                            "id": `${id}`,
                            "name": `${name}`,
                            "factor": Number(factor),
                            "date": Number(date),
                            "winners": Number(winners),
                        }
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`
                    },
                }
            )
            setLoading(false)
            if (raffle.status == 200) {
                setRaffleWinners(raffle.data.data)
            } else {
                setOpen(true)
            }
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
    useEffect(async () => {
        try {
            const oportunities = await axios.post(generateOpportunities,
                {
                    "evt": {
                        "id": `${id}`,
                        "name": `${name}`,
                        "factor": Number(factor),
                        "date": `${date}`,
                        "winners": Number(winners),
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.accessToken}`
                    },
                }
            )
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
            <Collapse in={open}>
                <Alert
                    severity="error"
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
                    Error en base de datos
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
                    {loading && (
                        <Grid item
                            xs={12}
                        >
                            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" display={false}>
                                <CircularProgress />
                            </Stack>
                        </Grid>
                    )}
                    {raffleWinners!=null &&(
                        raffleWinners.map((item, index) => (
                            <Grid item>
                                <Card sx={{ maxWidth: 345 }} variant="outlined">
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {item?.balanceRegistry?.accountId}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {`${item?.balanceRegistry?.name} ${item?.balanceRegistry?.lastName}`}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Lugar: {index+1}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={() => { navigate('/winners', { state: item }); }}
                                        >
                                            Jugar evento
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Lounge
