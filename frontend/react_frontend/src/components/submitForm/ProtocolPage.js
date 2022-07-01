import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useLocation } from "react-router";

// Import requisition details
import protocolList from "./requisitionDetailList/otherProtocolDetails";

// Import support function
import formatProtocolArray from "./supportFunction/formatProtocolArray";
import indicateDate from "./supportFunction/indicateDate";
import protocolStyle from "./supportFunction/protocolStyle";

// Import buttons
import CancelRequisition from "../edit/CancelRequisition";

//  Material UI Styles
import {
    Button,
    ButtonGroup,
    makeStyles,
    Tooltip
} from '@material-ui/core'
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { Alert, Box, Snackbar } from "@mui/material";

/**
 * Prepare class styles.
 * @type {(props?: any) => ClassNameMap<"contain"|"buttonStyle"|"table">}
 */
const useStyles = makeStyles({
    table: {
        minWidth: 650
    },
    contain: {
        marginTop: 10
    },
    buttonStyle: {
        margin: 5
    },
    gridHeaderSeperatorless: {
        //backgroundColor: "#64B5F6",
        '& > .MuiDataGrid-columnSeparator': {
            visibility: 'hidden',
            width: '0px'
        }
    },
    toolbarButton: {
        marginLeft: "3px",
        marginTop: "4px",
        top: 0
    },
});

/**
 * This function returns the Protocol page.
 * @returns {JSX.Element}
 * @constructor
 */
export const ProtocolPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [realPosts, setRealPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Setup snackbar props.
     * snackbarOpen: Open state for snackbar popup messages.
     * snackMessage: Message to display on snackbar.
     * snackMessage: Type of snackbar to show. Affects color and icon.
     * Values: "success", "error", "warning", "info".
     */
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState();
    const [snackSeverity, setSnackSeverity] = useState();

    /**
     * Shows snackbar.
     * @param message The message to be displayed on snackbar.
     * @param severity The type of snackbar to show. Types: "success", "error", "warning", "info".
     */
    const showSnack = (message, severity) => {
        setSnackMessage(message);
        setSnackSeverity(severity);
        setSnackbarOpen(true);
    }

    /**
     * Handles snackbar close event.
     * @param event
     * @param reason
     */
    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    /**
     * Setup sort model props.
     */
    const [sortModel, setSortModel] = useState([
        { field: 'urgency', sort: 'asc' },
        { field: 'priority', sort: 'asc' },
        { field: 'dateCreated', sort: 'asc' }
    ]);

    /**
     * Sorts the table by urgency, priority, and dateCreated.
     */
    const sortMostUrgent = () => {
        setSortModel([
            { field: 'urgency', sort: 'asc' },
            { field: 'priority', sort: 'asc' },
            { field: 'dateCreated', sort: 'asc' }
        ]);
    }

    /**
     * Handles the edit button event.
     * @param rows The rows will be updated.
     */
    const handleUpdateClick = (row) => {
        let chosenprotocol = {};

        realPosts.forEach(post => {
            if (post.customRequisition.id === row.customRequisition_id) {
                chosenprotocol = post;
            }
        });

        // Redirect to the update page.
        history.push({
            pathname: "/apps/update",
            state: {
                detail: { ...chosenprotocol }
            }
        })
    }

    /**
     * Gets suggested protocol list based on which role is selected.
     */
    const searchPendingRequisitions = () => {
        axios.get('http://localhost:8000/api/auth/scheduleProtocol', {
            params: {
                role: localStorage.getItem('role')
            }
        }).then(res => {
            setRealPosts(res.data.objScheduleProtocol);
            setPosts(formatProtocolArray(res.data.objScheduleProtocol), setIsLoading(false));
            localStorage.setItem('approvalLevel', res.data.objScheduleProtocol.approvalLevel);
        })
    }

    /**
     * Handles approval level event.
     * @param rows The rows will be leveled `Up` or `Down`.
     * @param level The level indicates whether the level should go `Up` or `Down`.
     */
    const handleApprovalLevel = (rows, level) => {
        const stageOne = "Pending Coding";
        const stageTwo = "Pending Timing";
        const final = "Pending Scheduling";
        let approval = rows.approvalLevel;
        let chosenprotocol = {};
        let newSequences = [];
        let newProtocols = [];

        if (level === "levelUp") {
            approval = approval === stageOne ? stageTwo :
                approval === stageTwo ? final : approval;
        } else if (level === "levelDown") {
            approval = approval === stageTwo ? stageOne : approval;
        }

        realPosts.forEach(post => {
            if (post.customRequisition.id === rows.customRequisition_id) {
                chosenprotocol = post;
            }
        });

        chosenprotocol.sequences.forEach(sequence => {
            newSequences.push(sequence.sequenceID);
        })

        chosenprotocol.suggestedProtocol.forEach(protocol => {
            newProtocols.push(protocol.ProtocolID);
        })

        axios({
            method: 'put',
            url: 'api/auth/scheduleProtocol',
            data: {
                scheduleProtocol_id: chosenprotocol.id,
                suggestedProtocol: newProtocols,
                urgency: chosenprotocol.customRequisition.urgency,
                priority: chosenprotocol.customRequisition.priority,
                timing: chosenprotocol.timing,
                clinicalInformation: chosenprotocol.customRequisition.clinicalInformation,
                approvalLevel: approval,
                sequences: newSequences
                // scheduleProtocol_id: rows.scheduleProtocol_id,
                // suggestedProtocol: rows.suggestedProtocol,
                // urgency: rows.urgency,
                // priority: rows.priority,
                // timing: rows.timing,
                // clinicalInformation: rows.clinicalInformation,
                // approvalLevel: approval,
                // sequences: rows.sequences
            }
        }).then(() => {
            const isMatchID = (event) => event.scheduleProtocol_id === rows.scheduleProtocol_id;
            const postsClone = [...posts];
            const updatedPostIndex = postsClone.findIndex(isMatchID);

            if (updatedPostIndex > -1) {
                const updatedPost = postsClone[updatedPostIndex];

                updatedPost.approvalLevel = approval;

                postsClone[updatedPostIndex] = updatedPost;

                if (approval === final) postsClone.splice(updatedPostIndex, 1);

                setPosts(postsClone);
            }

            showSnack("Changed Approval Level.", "success");
        })
    }

    /**
     * Gets the suggested protocol list from the database.
     */
    useEffect(() => {
        searchPendingRequisitions()

        try {
            showSnack(location.state.detail.message, location.state.detail.severity);
        } catch (e) { }
    }, [])

    return (
        <div style={{ display: "flex", height: "100%", justifyContent: "center" }}>
            <Box
                sx={protocolStyle}>
                <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    loading={isLoading}
                    getRowClassName={(params) => indicateDate(params.row.dateCreated)}
                    getRowId={(row) => row.scheduleProtocol_id}
                    rows={posts}
                    sortModel={sortModel}
                    onSortModelChange={newSortModel => setSortModel(newSortModel)}
                    initialState={{
                        sorting: {
                            sortModel: sortModel
                        }
                    }}
                    columns={[...protocolList,
                    {
                        flex: "auto",
                        minWidth: 296,
                        field: "Button",
                        disableColumnMenu: true,
                        sortable: false,
                        align: "right",
                        headerClassName: classes.gridHeaderSeperatorless,
                        renderHeader: () => (
                            <></>
                        ),
                        renderCell: (params) => (
                            <ButtonGroup size="small" variant="contained">
                                <Button color="primary" onClick={() => { handleApprovalLevel(params.row, "levelUp") }}>
                                    Accept
                                </Button>
                                <Button style={{ backgroundColor: "#4F7942" }} color="primary" onClick={() => { handleUpdateClick(params.row) }}>
                                    Edit
                                </Button>
                                <Button color="secondary" onClick={() => { handleApprovalLevel(params.row, "levelDown") }}>
                                    Reject
                                </Button>
                                <CancelRequisition
                                    rows={params.row}
                                    posts={posts}
                                    onPostUpdated={setPosts}
                                    showSnack={showSnack}
                                />
                            </ButtonGroup>
                        )
                    }
                    ]}
                    components={{
                        Toolbar: () => (                                                                  // Custom toolbar header
                            <GridToolbarContainer>
                                <div style={{ display: "flex", alignContent: "center", borderBottom: "1px solid #0000003B", width: "100%" }}>
                                    <div style={{ display: "flex", flex: 1.5, alignContent: "center" }}>
                                        <div style={{ flex: 1.5 }}>
                                            <Button
                                                size="small"
                                                color="primary"
                                                variant="contained"
                                                onClick={sortMostUrgent}
                                                style={{ marginBottom: "4px" }}
                                                InputProps={{
                                                    className: classes.toolbarButton,
                                                }}
                                            >
                                                Sort by most urgent
                                            </Button>
                                        </div>
                                        <div style={{ flex: 1.5 }}></div>
                                        <div style={{ flex: 1.5 }}></div>
                                    </div>
                                </div>
                            </GridToolbarContainer>
                        )
                    }}
                />

                {/**
                  * Show popup message.
                  */}
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackClose}
                >
                    <Alert
                        severity={snackSeverity}
                        onClose={handleSnackClose}
                        sx={{ width: '100%' }}
                    >
                        {snackMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    )
}