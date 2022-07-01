import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ButtonGroup,
  Box,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const App = (props) => {


  const [addOpen, setAddOpen] = useState(false);
  const [addItem, setAddItem] = useState("");
  const [itemList, setItemList] = useState(props.itemList);
  const [errorMessage, setErrorMessage] = useState("");                         // Used for error in popup.
  const [outterError, setOutterError] = useState(props.errorMessage);           // Error message received from parent. Used for required error on itemList.
  const [boxBorder, setBoxBorder] = useState("1px solid rgba(0,0,0,0.4)");      // Border of container. Reflects outter error.

  // Determine border color based on passed error
  useEffect(() => {
    if(outterError !== "") {
      setBoxBorder("2px solid #FF0000");
    } else {
      setBoxBorder("1px solid rgba(0,0,0,0.4)") ;
    }
  }, [outterError])

  const handleAddOpen = (e) => {
    setAddOpen(true);
  };

  const handleAddClose = (e) => {
    setAddOpen(false);
    setErrorMessage("");
    setAddItem("");
  };

  const handleAddItem = (e) => {
    let errors = 0;

    if (addItem === "" || !addItem) {
      setErrorMessage("Required");
      errors++;
    }

    if (addItem.length > 50) {
      setErrorMessage("Cannot exceed 50 characters");
      errors++;
    }

    itemList.forEach(ele => {
      if(ele === addItem) {
        setErrorMessage("Subtype already exists");
        errors++;
      }
    })

    if (errors === 0) {
      setItemList([...itemList, addItem])
      setAddItem("");
      setAddOpen(false);
    }
  };

  const handleAddItemChange = (e) => {
    setAddItem(e.target.value);
  };

  const handleDelete = (e) => {
    let deleteIndex = Number(e.currentTarget.id);
    let workingArray = [...itemList];
    workingArray.splice(deleteIndex, 1);
    setItemList(workingArray)
  };

  useEffect(() => {
    props.onListChange(itemList)
  }, [itemList])

  return (
    <Container style={{ padding: 0 }}>
      <Button
        onClick={handleAddOpen}
        color="primary"
        variant="contained"
        size="small"
        startIcon={<AddCircleOutlineIcon />}
      >
        Add {props.listType}
      </Button>

      <Box style={{ border: boxBorder, marginTop: "4px" }}>
        <List
          style={{ maxHeight: 256, minHeight: 256, overflow: "auto", }}
        >
          {itemList
            .sort((a, b) => (a > b) ? 1 : -1)
            .map((item, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={item}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" id={i} onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Box>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add {props.listType}</DialogTitle>
        <DialogContent>
          <TextField
            autofocus
            onChange={handleAddItemChange}
            value={addItem}
            error={errorMessage !== ""}
            helperText={errorMessage}
          >
          </TextField>
          <DialogActions>
            <ButtonGroup size="small" variant="contained">
              <Button onClick={handleAddItem} color="primary">Add</Button>
              <Button onClick={handleAddClose} color="secondary">Cancel</Button>
            </ButtonGroup>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default App;
