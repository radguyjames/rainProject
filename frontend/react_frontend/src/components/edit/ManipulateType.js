import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    makeStyles,
    ButtonGroup,
    Paper,
    Select,
    MenuItem
} from "@material-ui/core";
import axios from "axios";
import VariableTextList from './VariableTextList'

const useStyles = makeStyles((theme) => ({
    title: {
        margin: "30px 0px 30px 0px",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    nameField: {
        width: '241px',
        paddingLeft: '41px'
    },
    typeField: {
        width: '120px',
        marginLeft: '41px'
    },
    pointField: {
        width: '71px',
        paddingLeft: '41px'
    },
    contentGrid: {
        width: '700px',
        margin: 'auto'
    },
    inputLabel: {
        padding: '6px 0 7px'
    },
    gridItem: {
        marginBottom: '20px'
    }
}));

const App = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [type, setType] = useState(props.initial);
    const [titleOption, setTitleOption] = useState(false);
    const [typeMessage, setTypeMessage] = useState("");
    const [subtypeMessage, setSubtypeMessage] = useState("")

    useEffect(() => {
        setTitleOption(type.type);
    }, [])

    const handleTypeChange = (e) => {
        setType({ ...type, type: e.target.value });
    }

    const handleCancel = (e) => {
        history.push("/apps/edit/types");
    }

    // Validation
    const handleSave = (e) => {
        let errors = 0;

        if (!type.type) {
            setTypeMessage("Required");
            errors++;
        }

        if (type.type.length > 50) {
            setTypeMessage("Cannot exceed 50 characters");
            errors++;
        }

        if (type.subtypes.length === 0 || !type.subtypes) {
            setSubtypeMessage("Required");
            errors++;
        }

        if (errors === 0) {
            props.onPost(type);
        }
    }

    // Enables enter key
    // useEffect(() => {
    //     function handleKeyDown(e) {
    //         if (e.keyCode === 13) {
    //             handleSave();
    //         }
    //     }

    //     document.addEventListener('keydown', handleKeyDown);

    //     return function cleanup() {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     }
    // }, []);

    return (
        <Container>
            <Paper style={{ paddingBottom: '50px', marginBottom: '50px', marginTop: '24px' }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        backgroundColor: '#64B5F6',
                        marginBottom: '40px',
                        height: '100px',
                        borderTopLeftRadius: '4px',
                        borderTopRightRadius: '4px'
                    }}>
                    <h1
                        style={{ margin: 'auto' }}
                    >
                        {props.type === "Edit" ? `Edit Exam Type: ${titleOption}` : `Create Exam Type`}
                    </h1>
                </div>

                <Grid container className={classes.contentGrid}>
                    <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.inputLabel}>Type:</Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.gridItem}>
                        <TextField
                            autoFocus
                            fullWidth
                            value={type.type}
                            onChange={handleTypeChange}
                            error={typeMessage !== ""}
                            helperText={typeMessage}
                        />
                    </Grid>
                    <Grid item xs={3} className={classes.gridItem}>
                        <Typography className={classes.inputLabel}>Subtypes:</Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.gridItem}>
                        <VariableTextList
                            itemList={type.subtypes.map(item => item.subtype)}
                            listType="Subtype"
                            onListChange={value => setType({ ...type, subtypes: value })}
                            errorMessage={subtypeMessage}
                            key={subtypeMessage}
                        />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: "left" }}>
                        <ButtonGroup size="small" variant="contained" style={{ marginTop: '20px' }}>
                            <Button onClick={handleSave} color='primary'>{props.type === "Edit" ? "Save" : "Create"}</Button>
                            <Button onClick={handleCancel} color='secondary'>Cancel</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default App;
