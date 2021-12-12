import React, {Fragment} from 'react'
import {Typography} from '@material-ui/core';
import {LinearProgress, Box} from '@material-ui/core';

function LinearRegister(props) {

    return (
        <Fragment>
            <Typography variant="h6" color="primary" align="center" style={{marginTop: '10px'}}>
                {props.name}
            </Typography>
            <div align="center">
                <Box sx={{alignItems: 'center'}}>
                    <Box sx={{ width: props.width, mr: 1, margin: "10px" }}>
                        <LinearProgress variant="determinate" value={props.value}/>
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2">{`${Math.round(props.value)}${props.sufix}`}</Typography>
                    </Box>
                </Box>
            </div>
        </Fragment>
    )
}

export default LinearRegister;