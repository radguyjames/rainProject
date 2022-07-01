import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import requisition details
import protocolList from "./requisitionDetailList/protocolDetail";

// Import support function
import formatProtocolArray from "./supportFunction/formatProtocolArray";
import protocolStyle from "./supportFunction/protocolStyle";

//  Material UI Styles
import {
    makeStyles,
    Container
} from '@material-ui/core'
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

/**
 * Prepare class styles.
 * @type {(props?: any) => ClassNameMap<"contain"|"buttonStyle"|"table">}
 */
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    contain: {
        marginTop: 10,
    },
    buttonStyle: {
        margin: 5,
    }
});

/**
 * This function returns the outstanding protocol page.
 * @returns {JSX.Element}
 * @constructor
 */
export const OutstandingProtocols = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Fetches the protocol data.
     * Hint:
     * Adding an empty array as the second parameter means this effect will only run once,
     * see browser console.
     */
    useEffect(() => {
        axios.get('http://localhost:8000/api/auth/scheduleProtocol',{
            params: { role: "all" }
        }).then(res => {
            setPosts(formatProtocolArray(res.data.objScheduleProtocol), setIsLoading(false));
        })
    }, [])

    return (
        <Container maxWidth='xl'>
            <Box
                sx={protocolStyle}>
                <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    loading={isLoading}
                    getRowId={(row) => row.scheduleProtocol_id}
                    rows={posts}
                    columns={protocolList}
                />
            </Box>
        </Container>
    )
}