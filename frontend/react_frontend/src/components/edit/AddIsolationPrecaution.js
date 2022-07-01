import React from "react";
import ManipulateIsolationPrecaution from './ManipulateIsolationPrecaution'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();
  
    const initial = {
        id: null,
        isolationPrecaution: null,
        requirements: [],
    }
  
    const handleOnPost = (values) => {
        axios.post('api/auth/isolationprecautions', values)
            .then(res => {
                history.push({pathname: "/apps/edit/isolationprecautions", state: {detail: {message: "Created isolation option", severity: "success"}}})
            }).catch((error) => {
                console.log(error)
                history.push({pathname: "/apps/edit/isolationprecautions", state: {detail: {message: "Something went wrong!", severity: "error"}}})
            })
    }
  
    return (
        <Container maxWidth="md">
            <ManipulateIsolationPrecaution initialIsolationPrecaution={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
