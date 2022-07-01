import React from "react";
import ManipulateSequence from './ManipulateSequence'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();
  
    const initial = {
        id: null,
        sequence: "",
    }
  
    const handleOnPost = (values) => {
        axios.post('api/auth/sequences', values)
            .then(res => {
                history.push({pathname: "/apps/edit/sequences", state: {detail: {message: "Created sequence", severity: "success"}}})
            }).catch((error) => {
                console.log(error)
                history.push({pathname: "/apps/edit/sequences", state: {detail: {message: "Something went wrong!", severity: "error"}}})
            })
    }
  
    return (
        <Container maxWidth="md">
            <ManipulateSequence initialSequence={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
