import React from "react";
import ManipulateType from './ManipulateType'
import {
    Container,
} from "@material-ui/core";
import axios from 'axios'
import { useLocation, useHistory } from "react-router";

const App = () => {
    const history = useHistory();
    const location = useLocation();

    const initial = {
        id: (location.state ? location.state.detail.id : null),
        type: (location.state ? location.state.detail.type : ""),
        subtypes: (location.state ? location.state.detail.subtypes: [])
    }

    const handleOnPut = (values) => {
        axios.put('api/auth/types', values)
            .then(res => {
                history.push({ pathname: "/apps/edit/types", state: { detail: { message: "Updated type", severity: "success" } } })
            }).catch((error) => {
                console.log(error)
                history.push({ pathname: "/apps/edit/types", state: { detail: { message: "Something went wrong!", severity: "error" } } })
            })
    }

    return (
        <Container maxWidth="md">
            <ManipulateType initial={initial} type="Edit" onPost={values => handleOnPut(values)} />
        </Container>
    );
};

export default App;
