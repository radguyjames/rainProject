import React from "react";
import ManipulateKeyword from './ManipulateKeyword'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();
  
    const initial = {
        id: null,
        keyword: null,
        points: 0,
        type: null
    }
  
    const handleOnPost = (values) => {
        axios.post('api/auth/keywords', values)
            .then(res => {
                history.push({pathname: "/apps/edit/keywords", state: {detail: {message: "Created keyword", severity: "success"}}})
            }).catch((error) => {
                console.log(error)
                history.push({pathname: "/apps/edit/keywords", state: {detail: {message: "Something went wrong!", severity: "error"}}})
            })
    }
  
    return (
        <Container maxWidth="md">
            <ManipulateKeyword initialKeyword={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
