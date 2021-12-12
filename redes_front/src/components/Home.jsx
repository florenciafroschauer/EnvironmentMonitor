import React, {useState, useEffect, Fragment} from 'react'
import {Typography, Snackbar} from '@material-ui/core';
import {Alert, AlertTitle} from "@material-ui/lab";
import CircularRegister from './CircularRegister';
import LinearRegister from './LinearRegister';

const Home = () => {

    const url = "http://localhost:3000";
    const [alertData, setAlertData] = useState({alert: true, title: "Titulo", msg: "Mensaje", type: "info"})
    const [data, setData] = useState({light: 2.35, humidity: 80, temp: 27});

    const fetchData = async () => {
        try { 
            const response = await  fetch(url + '/stats');
            if (!response.ok) {throw Error(response.statusText);}
            const json = await response.json();
            setData(json)

            const responseAlert = await  fetch(url + '/alert');
            if (!responseAlert.ok) {throw Error(response.statusText);}
            const jsonAlert = await responseAlert.json();
            setAlertData(jsonAlert)
            }   
        catch (error) {console.log(error);}
    }

    useEffect(()=>{
        setInterval(() => {
        fetchData()
        }, 1000);
    }, [])

    document.title = 'Home'

    return (
        <Fragment>
            <Typography variant="h4" color="primary" align="center" style={{marginTop: '50px'}}>
                Variables
            </Typography>
            <div align="center">
                <CircularRegister name="Luz" value={100*(5-data.light)/5} sufix="%" />
                <CircularRegister name="Humedad" value={data.humidity} sufix="%" />
            </div>

            <LinearRegister name="Temperatura" value={data.temp} width="300px" sufix="ºC" />

            <Snackbar open={alertData.alert} autoHideDuration={1000}>
                <Alert severity={alertData.type}>
                    <AlertTitle>{alertData.title}</AlertTitle>
                    {alertData.msg}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default Home;