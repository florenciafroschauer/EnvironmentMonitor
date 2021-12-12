import React from 'react'
import {Typography} from '@material-ui/core';
import {CircularProgress, Box} from '@material-ui/core';

function CircularRegister(props) {

    return (
        <div style={{display: "inline-block", paddingLeft: "20px", paddingRight: "20px"}}>
            <Typography variant="h6" color="primary" align="center" style={{marginTop: '10px'}}>
                {props.name}
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress value={props.value} variant="determinate" size={60} thickness={5}/>
                <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}${props.sufix}`}</Typography>
                </Box>
            </Box>
        </div>
    )
}

export default CircularRegister;