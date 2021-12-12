import React from 'react'
import {AppBar, Toolbar, Typography, makeStyles, Button, Icon} from '@material-ui/core'
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar
}))

const Navbar = () => {
    const classes = useStyles()

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Link to="/">
                        <Button variant='contained' color='primary' disableElevation>
                            <Icon>home</Icon>
                        </Button>
                    </Link>
                    <Typography variant='h6'>
                        TP Redes
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    )
}

export default Navbar