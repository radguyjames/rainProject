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
  Select,
  MenuItem,
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
  },
  select: {
    padding: "0px",
  }
}));

const AlterProtocol = () => {
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
  const [protocols, setProtocols] = useState([]);                         // Full dataset loaded from database.
  const [tempData, setTempData] = useState([]);                           // Intermediate array between protocols and tableData. Used for category filtering.
  const [tableData, setTableData] = useState([]);                         // Filtered data subset based on search. This is displayed in the table.
  const [types, setTypes] = useState();                                   // Type categories loaded from database.
  const [part, setPart] = useState("All");                                // Currently selected category.

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
    const filteredRows = tempData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });

    setTableData(filteredRows);
  };

  // Filter data by category when select changes
  const updateTypeSelect = (e) => {
    let selected = e.target.value;

    if(selected === "All") {
      setTempData(protocols);
    } else {
      let accumulator = [];

      for(let i of protocols) {
        if(i.type === selected) {
          accumulator.push(i);
        }
      }

      setTempData(accumulator);
    }

    setPart(selected);
  };

  useEffect(() => {
    requestSearch(search);
  }, [tempData])

  // Fetches all protocol data from database
  const handleSearch = (e) => {
    axios.get('http://localhost:8000/api/auth/protocols')
    .then(res => {
      let data = res.data.objProtocols;

      for(let i of data) {
        let sequenceString = [];
        let keywordString = [];
        let examCodeString = [];

        for(let j of i.sequences) {
          sequenceString.push(j.sequence);
        }

        for (let j of i.keywords) {
          keywordString.push(j.keyword);
        }

        for (let j of i.examCodes) {
          examCodeString.push(j.examCode);
        }

        sequenceString = sequenceString.join(", ");
        keywordString = keywordString.join(", ");
        examCodeString = examCodeString.join(", ");

        i.sequenceString = sequenceString;
        i.keywordString = keywordString;
        i.examCodeString = examCodeString;
      }

      setProtocols(data);
      setTableData(data);
      setTempData(data);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err)
    })
  };

  // Initial data population
  useEffect(() => {
    handleSearch();

    axios.get("http://127.0.0.1:8000/api/auth/types")
      .then(res => {
        setTypes(res.data.objType);
      })
      .catch(err => {
        console.log(err);
      })

    // Show snacks for create and edit
    try {
      showSnack(location.state.detail.message, location.state.detail.severity);
    } catch(e) {
      //console.log(e);
    }
  }, []);

  // Redirect to edit page
  const handleEditClick = (ID) => {
    let chosenprotocol = {}

    for (let protocol in protocols) {
      if (protocols[protocol].id === ID) {
        chosenprotocol = protocols[protocol]
      }
    }
    
    history.push({
      pathname : "/apps/edit/protocols/edit",
      state: {detail: {...chosenprotocol}}
    })
  }

  // Redirect to add page
  const handleNewProtocol = () => {
    history.push({
      pathname : "/apps/edit/protocols/add"
    })
  }

  // Show delete popup
  const handleDeleteClick = (ID) => {
    setDeleteId(ID);
    
    setOpenDeleteConfirm(true);
  }

  const handleDeleteClose = (e) => {
    setOpenDeleteConfirm(false);
  };

  // Delete target row
  const handleDeleteItem = (e) => {
    axios.delete('http://localhost:8000/api/auth/protocols', {
      params: {id: deleteId}
    })
      .then(res => {
        setOpenDeleteConfirm(false);
        handleSearch();
        showSnack("Deleted protocol", "info");
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
          Protocols
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
                flex: 1.25,
                field: "protocol",
                headerName: "Protocol",
                disableColumnMenu: true,
                headerClassName: classes.gridHeader,
                renderCell: renderCellExpand
              },
              {
                flex: 0.5,
                field: "typeString",
                headerName: "Type",
                disableColumnMenu: true,
                headerClassName: classes.gridHeader,
                renderCell: renderCellExpand
              },
              {
                flex: 2,
                field: "sequenceString",
                headerName: "Sequences",
                disableColumnMenu: true,
                headerClassName: classes.gridHeader,
                renderCell: renderCellExpand
              },
              {
                flex: 2,
                field: "keywordString",
                headerName: "Associated Keywords",
                disableColumnMenu: true,
                headerClassName: classes.gridHeader,
                renderCell: renderCellExpand
              },
              {
                flex: 1,
                field: "examCodeString",
                headerName: "Exam Codes",
                disableColumnMenu: true,
                headerClassName: classes.gridHeader,
                renderCell: renderCellExpand
              },
              {
                flex: 0.7,
                field: "examTime",
                headerName: "Exam Time",
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
                    <Button size="small" variant="contained" color="primary" onClick={() => handleNewProtocol()}>Add</Button>
                  </div>
                ),
                renderCell: (params) => (                                                       // Edit / delete column buttons
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
                        style={{flex: 2}}
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
                      <Select
                        value={part}
                        onChange={updateTypeSelect}
                        variant="outlined"
                        style={{flex: 1, backgroundColor: "#FFFFFF", height: "40px", marginLeft: "5px", marginTop: "4px"}}
                        InputProps={{className: classes.select}}
                      >
                        <MenuItem value={"All"}>All</MenuItem>

                        {!types ? null :
                        types.map(({id, type}) => (
                            <MenuItem key={id} value={id}>{type}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <p style={{flex: 1, display: "flex", justifyContent: "center"}}>
                      {tableData.length} {tableData.length === 1 ? ("Result Found") : ("Results Found")}
                    </p>
                    <div style={{flex: 1.5}}>
                      {/* Put import / export buttons here */}
                    </div>
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

export default AlterProtocol;