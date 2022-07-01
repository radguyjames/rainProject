import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router";

import axios from 'axios'

//  Material UI Styles
import {
    Paper,
    Container,
    makeStyles,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    Button,
    ButtonGroup,
    Grid,
    InputLabel,
    MenuItem,
    TextField,
    Select,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar
} from '@material-ui/core'
import Alert from "@material-ui/lab/Alert";

//  Styling function
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    buttonStyle: {
        margin: 5,
    },
    selectLabel: {
        fontSize: "12px",
        marginRight: "210px"
    },
    form: {
        margin: "25px auto 75px auto",
        width: "700px"
    },
  });

  //    Change role number to an actual name.
  const encodeRoleName = (role) => {
      switch(role){
          case "-2": return "Admin";
          case "0": return "Physician";
          case "1": return "Clerk";
          case "2": return "Radiologist";
          case "3": return "Technologist";
          default: return "Unknown";

      }
  }

  //    Format phone number field. https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return phoneNumberString
  }

export const UserManagement = () => {

    const classes = useStyles();
    const history = useHistory();
    
    const [users, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState({role: 100, username: ''})

    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
    const [openToggleConfirm, setOpenToggleConfirm] = useState(false)
    const [targetId, setTargetId] = useState(-1)

    const [alertFeedback, setAlertFeedback] = useState({ severity: "error", message: "This message should never display" })
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return; 
        }
    
        setSnackbarOpen(false);
    };

    const handleInputChange = (e) => {
        setSearchTerms({...searchTerms, [e.target.name]: e.target.value})
    }

    const handleOnSearch = (e) => {
        e.preventDefault()
        searchUsers()
    }

    const handleNewUser = (e) => {
        e.preventDefault()
        history.push({
          pathname : "/apps/usermanagement/add"
        })
    }

    const handleDeleteClose = (e) => {
        setOpenDeleteConfirm(false);
    }
    
    const handleDeleteItem = (e) => {   
        axios.delete('http://localhost:8000/api/auth/usermanagement', {
            params: {id: targetId}
          })
            .then(res => {
                searchUsers()
                setAlertFeedback({ severity: "success", message: "User has been deleted." })
                setSnackbarOpen(true)
            })
            .catch(error => {
                setAlertFeedback({ severity: "error", message: error.response.data })
                setSnackbarOpen(true)
          })
        setOpenDeleteConfirm(false);
    }

    const handleDeleteClick = (e) => {
        setTargetId(e.currentTarget.parentNode.id);
    
        setOpenDeleteConfirm(true);
    }

    const handleToggleClose = (e) => {
        setOpenToggleConfirm(false);
    }
    
    const handleToggleActivation = (e) => {   
        axios.put('api/auth/usermanagement', {id: targetId, mode:"toggle"})
        .then(res => {
            searchUsers()
            setAlertFeedback({ severity: "success", message: "User activation has been toggled." })
            setSnackbarOpen(true)
        }).catch((error) => {
            setAlertFeedback({ severity: "error", message: error.message })
            setSnackbarOpen(true)
        })
        setOpenToggleConfirm(false);
    }

    const handleToggleClick = (e) => {
        setTargetId(e.currentTarget.parentNode.id);
    
        setOpenToggleConfirm(true);
    }

    const handleEditUser = (e) => {
    
        let userId = Number(e.currentTarget.parentNode.id)
        let chosenUser = {}
        for (let user in users) {
          if (users[user].id === userId) {
            chosenUser = users[user]
          }
        }
        
        history.push({
          pathname : "/apps/usermanagement/edit",
          state: {detail: {...chosenUser}}
        })
    }

    const searchUsers = () => {
        axios.get('http://localhost:8000/api/auth/usermanagement',{
            params: searchTerms
        })
        .then(res => {
            setUsers(res.data.objUsers)
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        searchUsers()
      }, [])

    return (
        <Container maxwidth='xl'>
            
            <form onSubmit={handleOnSearch} className={classes.form}>
                <Grid container justify="center" alignItems="center">
                    <Grid item container xs={4} justify="center">
                        <InputLabel id="role-label" className={classes.selectLabel}>Role</InputLabel>
                        <Select
                        required
                        labelId="role-label"
                        id="role"
                        name="role"
                        fullWidth
                        onChange={handleInputChange}
                        value={searchTerms.role}
                        >
                        <MenuItem value={100}>All</MenuItem>
                        <MenuItem value={-2}>Admin</MenuItem>
                        <MenuItem value={0}>Physician</MenuItem>
                        <MenuItem value={1}>Clerk</MenuItem>
                        <MenuItem value={2}>Radiologist</MenuItem>
                        <MenuItem value={3}>Technologist</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item container xs={4} justify="center">
                        <TextField
                        id="username"
                        label="Username"
                        name="username"
                        value={searchTerms.username}
                        onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item container xs={4} justify="center">
                        <Button variant="contained" color="primary" type="submit">
                        Search
                        </Button>
                    </Grid>
                </Grid>
             </form>

            <div style={{margin:'auto'}}>
                <Link href='#' onClick={handleNewUser} color="primary" style={{float: 'right'}}>
                Create New User
                </Link>
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">Site</TableCell>
                        <TableCell align="left">Department</TableCell>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Phone Number</TableCell>
                        <TableCell align="left">Fax</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((item, i) => (
                    <TableRow key={i}>
                        <TableCell align="left">
                            {item.username}
                        </TableCell>
                        <TableCell align="left">{encodeRoleName(item.role)}</TableCell>
                        <TableCell align="left">{item.site != "" ? item.site : "Not Provided"}</TableCell>
                        <TableCell align="left">{item.department != "" ? item.department : "Not Provided"}</TableCell>
                        <TableCell align="left">{item.first_name}</TableCell>
                        <TableCell align="left">{item.last_name}</TableCell>
                        <TableCell align="left">{formatPhoneNumber(item.phone)}</TableCell>
                        <TableCell align="left">{item.fax == "" ? "Not Provided" : item.fax}</TableCell>
                        <TableCell align="left">{item.is_active ? "Active" : "Inactive"}</TableCell>
                        <TableCell align="left">
                            <ButtonGroup size="small" variant="contained" id={item.id}>
                                <Button onClick={handleToggleClick}>{item.is_active ? "Deactivate" : "Activate"}</Button>
                                <Button color='primary' onClick={handleEditUser}>Edit</Button>
                                <Button color='secondary' onClick={handleDeleteClick}>Delete</Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>))
                    }
                </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openDeleteConfirm} onClose={handleDeleteClose}>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogContent>
                <DialogContentText>This action will not be reversible.</DialogContentText>
                <DialogActions>
                    <Button onClick={handleDeleteItem} color="primary">
                    Delete
                    </Button>
                    <Button onClick={handleDeleteClose} color="primary">
                    Cancel
                    </Button>
                </DialogActions>
                </DialogContent>
            </Dialog>  

            <Dialog open={openToggleConfirm} onClose={handleToggleClose}>
                <DialogTitle>Toggle Activation?</DialogTitle>
                <DialogContent>
                <DialogContentText>Active account will become inactive/Inactive account will become active.</DialogContentText>
                <DialogActions>
                    <Button onClick={handleToggleActivation} color="primary">
                    Confirm
                    </Button>
                    <Button onClick={handleToggleClose} color="primary">
                    Cancel
                    </Button>
                </DialogActions>
                </DialogContent>
            </Dialog>  

        
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