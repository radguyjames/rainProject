import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useHistory } from "react-router";

//  Material UI Styles
import {
    Container,
    makeStyles,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    ButtonGroup,
    Snackbar,
    TextField
} from '@material-ui/core'
import Alert from "@material-ui/lab/Alert";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//  Styling function
const useStyles = makeStyles({
    title: {
      margin: '20px 0px 40px 0px',
    },
    buttons: {
        marginTop: '20px'
    }
  });

const SiteManagement = () => {

    const classes = useStyles();
    const history = useHistory();
    
    const [settings, setSettings] = useState({})
    const [expanded, setExpanded] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleInputChange = (e) => {
        setSettings({...settings, [e.target.name]: e.target.value})
    }

    const handleSaveChanges = (e) => {
        e.preventDefault()
        axios.post('api/auth/sitesettings', settings)
        .then(res => {
            setAlertFeedback({ severity: "success", message: "Settings have been saved" })
            setSnackbarOpen(true)
        }).catch((error) => {
            setAlertFeedback({ severity: "error", message: error.message })
            setSnackbarOpen(true)
        })
    }

    const handleReturn = (e) => {
        history.push("/apps");
    }

    const [alertFeedback, setAlertFeedback] = useState({ severity: "error", message: "This message should never display" })
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return; 
        }
    
        setSnackbarOpen(false);
    };
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/auth/sitesettings')
        .then(res => {
            setSettings(res.data.settings)
        })
        .catch(error => {
            console.log(error)
        })
      }, [])

    return (
        <Container maxWidth='md'>

            <Typography align='center' variant='h4' className={classes.title}>Manage Site Settings</Typography>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id="panel1bh-header"
                >
                    <Typography>LDAP Settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField label="Server Address" id="LDAPServerAddress" name="LDAPServerAddress" value={settings.LDAPServerAddress ? settings.LDAPServerAddress : ""} onChange={handleInputChange} variant="outlined" fullWidth />
                    <TextField label="User Directory" id="LDAPUserDirectory" name="LDAPUserDirectory" value={settings.LDAPUserDirectory ? settings.LDAPUserDirectory : ""} onChange={handleInputChange} variant="outlined" fullWidth />
                </AccordionDetails>
            </Accordion>

            <ButtonGroup size="small" variant="contained" className={classes.buttons}>
              <Button onClick={handleSaveChanges} color='primary'>Save Changes</Button>
              <Button onClick={handleReturn} color='secondary'>Return</Button>
            </ButtonGroup>
        
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={alertFeedback.severity} variant="filled">
                {alertFeedback.message}
                </Alert>
            </Snackbar>
        
        </Container>
    )
}

export default SiteManagement