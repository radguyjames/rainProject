import React from "react";
import ManipulateType from './ManipulateType'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();

    const initial = {
        id: null,
        type: "",
        subtypes: []
    }

    const handleOnPost = (values) => {
        axios.post('api/auth/types', values)
            .then(res => {
                history.push({ pathname: "/apps/edit/types", state: { detail: { message: "Created type", severity: "success" } } })
            }).catch((error) => {
                console.log(error)
                history.push({ pathname: "/apps/edit/types", state: { detail: { message: "Something went wrong!", severity: "error" } } })
            })
    }

    return (
        <Container maxWidth="md">
            <ManipulateType initial={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
