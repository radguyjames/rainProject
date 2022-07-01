import React, { useState, useMemo, useEffect } from "react";
import Draggable from 'react-draggable';
import axios from "axios";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
    Button,
    makeStyles,
    TextField,
    ButtonGroup
} from "@material-ui/core";

/**
 * Prepares class styles.
 * @type {(props?: any) => ClassNameMap<"inputStyle"|"dialogTitle">}
 */
const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        textAlign: 'center',
        paddingBottom: '0'
    },
    inputStyle: {
        width: "600px",
        padding: "10px 10px 10px 0px",
        marginRight: "10px"
    },
    noLeftRadius: {
        borderRadius: "0px 4px 4px 0px"
    }
}));

/**
 * Provides a button for cancelling a requisition.
 * @param rows The rows will be cancelled from the protocol list.
 * @param posts The original posts.
 * @param onPostUpdated The setup post function from the protocol page.
 * @param showSnack The function from the protocol page.
 * @returns {JSX.Element}
 * @constructor
 */
const EndCalendar = ({   rows,
                         posts,
                         onPostUpdated,
                         showSnack
}) => {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deniedMessage, setDeniedMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Handles cancel button event.
     * @param e
     */
    const handleClickCancel = (e) => {
        setErrorMessage("");
        setDeniedMessage("");
        setDialogOpen(true);
    }

    /**
     * Handles dialog close event.
     * @param e
     */
    const handleDialogClose = (e) => {
        setDialogOpen(false);
    }

    /**
     * Handles submit button event.
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (deniedMessage === "") {
            setErrorMessage("Required");
        } else if (deniedMessage.length > 1500) {
            setErrorMessage("Cannot exceed 1500 characters");
        } else {
            axios.post('api/auth/denyProtocol', {
                scheduleProtocol_id: rows.scheduleProtocol_id,
                deniedMessage: deniedMessage
            }).then(() => {
                const isMatchID = (event) => event.scheduleProtocol_id === rows.scheduleProtocol_id;
                const postsClone = [...posts];
                const updatedPostIndex = postsClone.findIndex(isMatchID);

                if (updatedPostIndex > -1) {
                    postsClone.splice(updatedPostIndex, 1);
                    onPostUpdated(postsClone);
                }

                showSnack("Cancelled protocol.", "success");
            });
        }
    }

    return (
        <>
            <Button variant="contained" color="primary" size="small" onClick={handleClickCancel}
                style={{ backgroundColor: "black" }}
                className={classes.noLeftRadius}>
                Cancel
            </Button>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="draggable-dialog-title"
                maxWidth='md'
            >
                <DialogTitle className={classes.dialogTitle} id="draggable-dialog-title">
                    Cancel Requisition
                </DialogTitle>
                <DialogContent>
                    <p>Req ID: <b>{rows.customRequisition_id}</b></p>
                    <TextField
                        required
                        multiline
                        fullWidth
                        rows={3}
                        id="deniedMessage"
                        name="deniedMessage"
                        label="Reason"
                        variant="outlined"
                        error={errorMessage !== ""}
                        helperText={errorMessage}
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                        value={deniedMessage}
                        onChange={e => setDeniedMessage(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonGroup size="small" variant="contained">
                        <Button color="secondary" onClick={handleSubmit}>
                            Confirm
                        </Button>
                        <Button color="primary" onClick={handleDialogClose}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EndCalendar;