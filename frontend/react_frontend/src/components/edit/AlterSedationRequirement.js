import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@material-ui/lab/Alert";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import renderCellExpand from "../submitForm/supportFunction/renderCellExpand";
import {
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  Icon,
  Snackbar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridHeader: {
    backgroundColor: "#64B5F6",
  },
  gridHeaderSeperatorless: {
    backgroundColor: "#64B5F6",
    '& > .MuiDataGrid-columnSeparator': {
      visibility: 'hidden',
      width: '0px',
    },
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    marginTop: "4px",
    top: 0,
  }
}));

const AlterSedationRequirements = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(true);                       // Loading state for tableData. Table will show spinner if true.
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);      // Open state for delete confirmation popup. Don't set true before setting deleteId.
  const [deleteId, setDeleteId] = useState(0);                            // ID of entry to delete after confirmation.

  const [snackbarOpen, setSnackbarOpen] = useState(false);                // Open state for snackbar popup messages.
  const [snackMessage, setSnackMessage] = useState();                     // Message to display on snackbar.
  const [snackSeverity, setSnackSeverity] = useState();                   // Type of snackbar to show. Affects color and icon. Values: "success", "error", "warning", "info".

  const [search, setSearch] = useState("");                               // Holds the text currently entered in the searchbar.
  const [sedationRequirements, setSedationRequirements] = useState([]);   // Full dataset loaded from database.
  const [tableData, setTableData] = useState([]);                         // Filtered data subset based on search. This is displayed in the table.

  // Use this to show a snackbar popup
  const showSnack = (message, severity) => {
    setSnackMessage(message);
    setSnackSeverity(severity);   // "success" "error" "warning" "info"
    setSnackbarOpen(true);
  }

  // This happens when a snackbar is closed
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  // Used by requestSearch for fast filtering
  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };

  // Facilitates fast filtering on the datagrid
  const requestSearch = (searchValue) => {
    setSearch(searchValue);

    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = sedationRequirements.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });

    setTableData(filteredRows);
  };

  // Used for calling a query manually
  const handleSearch = (e) => {
    axios.get('http://localhost:8000/api/auth/sedationrequirements')
      .then(res => {
        setSedationRequirements(res.data.objSedationRequirements);
        setTableData(res.data.objSedationRequirements);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err)
      })
  };

  // Initial data population
  useEffect(() => {
    handleSearch();

    // Show snacks for create and edit
    try {
      showSnack(location.state.detail.message, location.state.detail.severity);
    } catch(e) {
      //console.log(e);
    }
  }, [])

  // Redirect to edit page
  const handleEditClick = (ID) => {
    let chosenSedationRequirement = {}
    
    for (let i of sedationRequirements) {
      if (i.id === ID) {
        chosenSedationRequirement = i
      }
    }
    
    history.push({
      pathname : "/apps/edit/sedationrequirements/edit",
      state: {detail: {...chosenSedationRequirement}}
    })
  }

  // Redirect to create page
  const handleNewSedationRequirement = () => {
    history.push({
      pathname : "/apps/edit/sedationrequirements/add"
    })
  }

  // Show delete popup
  const handleDeleteClick = (ID) => {
    setDeleteId(ID);
    
    setOpenDeleteConfirm(true);
  }

  // This happens when the delete popup closes
  const handleDeleteClose = (e) => {
    setOpenDeleteConfirm(false);
  };

  // This happens when you confirm a delete
  const handleDeleteItem = (e) => {
    axios.delete('http://localhost:8000/api/auth/sedationrequirements', {
      params: {id: deleteId}
    })
      .then(res => {
        setOpenDeleteConfirm(false);
        handleSearch();
        showSnack("Deleted sedation option", "info");
      })
      .catch(err => {
        setOpenDeleteConfirm(false);
        console.log(err)
        showSnack("Something went wrong!", "error");
    })
  }

  return (
    <Container maxWidth="xl">
      <div
        className="heading"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <h1
          style={{
            margin: "20px auto",
            padding: "5px 100px",
            borderRadius: "10px",
          }}
        >
          Sedation Options
        </h1>
      </div>

      <div style={{display: "flex", height: "100%", justifyContent: "center"}}>
        <div style={{width: "1200px"}}>
          <DataGrid
            autoHeight
            disableSelectionOnClick
            rows={tableData}
            loading={isLoading}
            columns={[                                                                          // Column headers
              {
                flex: 1,
                field: "sedationRequirement",
                headerName: "Sedation Option",
                disableColumnMenu: true,
                headerClassName: classes.gridHeader,
                renderCell: renderCellExpand
              },
              {
                flex: 3,
                field: "message",
                headerName: "Message",
                disableColumnMenu: true,
                headerClassName: classes.gridHeader,
                renderCell: renderCellExpand
              },
              {
                flex: "auto",
                minWidth: 142,
                field: "buttons",
                disableColumnMenu: true,
                sortable: false,
                headerAlign: "right",
                align: "right",
                headerClassName: classes.gridHeaderSeperatorless,
                renderHeader: () => (                                                           // Header create button
                  <div style={{height: "100%"}}>
                    <Button size="small" variant="contained" color="primary" onClick={() => handleNewSedationRequirement()}>Add</Button>
                  </div>
                ),
                renderCell: (params) => (
                  <ButtonGroup size="small" variant="contained">
                    <Button color="primary" onClick={() => handleEditClick(params.row.id)}>Edit</Button>
                    <Button color="secondary" onClick={() => handleDeleteClick(params.row.id)}>Delete</Button>
                  </ButtonGroup>
                )
              },
            ]}
            components={{
              Toolbar: () => (                                                                  // Custom toolbar header
                <GridToolbarContainer style={{backgroundColor: "#64B5F6", paddingTop: "0px"}}>
                  <div style={{display: "flex", alignContent: "center", borderBottom: "1px solid #0000003B", width: "100%"}}>
                    <div style={{display: "flex", flex: 1.5, alignContent: "center"}}>
                      <TextField
                        autoFocus
                        id="input-search"
                        type="search"
                        variant="outlined"
                        placeholder="Search"
                        size="small"
                        value={search}
                        style={{width: "355px"}}
                        onChange={(e => requestSearch(e.target.value))}
                        InputProps={{
                          className: classes.searchBar,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon>
                                <SearchIcon/>
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                    <p style={{flex: 1, display: "flex", justifyContent: "center"}}>
                      {tableData.length} {tableData.length === 1 ? ("Result Found") : ("Results Found")}
                    </p>
                    <div style={{flex: 1.5}}></div>
                  </div>
                </GridToolbarContainer>
              )
            }}
          />
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert severity={snackSeverity} onClose={handleSnackClose} sx={{ width: '100%' }}>{snackMessage}</Alert>
      </Snackbar>

      <Dialog open={openDeleteConfirm} onClose={handleDeleteClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>This action will not be reversible.</DialogContentText>
          <DialogActions>
            <ButtonGroup size="small" variant="contained">
              <Button onClick={handleDeleteItem} color="secondary">Delete</Button>
              <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
            </ButtonGroup>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AlterSedationRequirements;