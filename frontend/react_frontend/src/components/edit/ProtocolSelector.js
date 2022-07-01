import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ButtonGroup,
  Box,
  Grid
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const App = (props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [addItem, setAddItem] = useState();
  const [itemList, setItemList] = useState(props.itemList)
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddOpen = (e) => {
    setAddOpen(true);
  };

  const handleAddClose = (e) => {
    setAddOpen(false);
    setErrorMessage("");
    setAddItem();
  };

  const handleAddItem = (e) => {
    let errors = 0;

    if (!addItem) {
      setErrorMessage("Required");
      errors++;
    }

    if (errors === 0) {
      setItemList([...itemList, props.selectionPool.find(ele => ele.id === addItem)]);
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

      <Box style={{ border: "1px solid rgba(0,0,0,0.4)", marginTop: "4px" }}>
        <List
          style={{ maxHeight: 256, minHeight: 256, overflow: "auto", }}
        >
          {itemList
            .sort((a, b) => (a.protocol > b.protocol) ? 1 : -1)
            .map((item, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={
                    props.selectionPool.find(({ id }) => id === item.id) ? props.selectionPool.find(({ id }) => id === item.id).protocol : "ERROR: Not a valid sequence. Please Delete!"
                  }
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
          <Select
            required
            labelId={props.listType + "-label"}
            id={props.listType}
            name={props.listType}
            fullWidth
            onChange={handleAddItemChange}
            value={addItem}
            error={errorMessage !== ""}
          >
            {
              props.selectionPool
                .reduce((acc, sequence) => {
                  return itemList.includes(sequence)
                    ? acc
                    : [...acc, sequence];
                }, [])
                .map((item, i) => (
                  <MenuItem key={i} value={item.id}>
                    {item.protocol}
                  </MenuItem>
                ))
            }
          </Select>
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