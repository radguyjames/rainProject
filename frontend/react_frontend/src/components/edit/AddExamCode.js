import React from "react";
import ManipulateExamCode from './ManipulateExamCode'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();
  
    const initial = {
        id: null,
        examCode: "",
    }
  
    const handleOnPost = (values) => {
        axios.post('api/auth/examcodes', values)
            .then(res => {
                history.push({pathname: "/apps/edit/examcodes", state: {detail: {message: "Created exam code", severity: "success"}}})
            }).catch((error) => {
                console.log(error)
                history.push({pathname: "/apps/edit/examcodes", state: {detail: {message: "Something went wrong!", severity: "error"}}})
            })
    }
  
    return (
        <Container maxWidth="md">
            <ManipulateExamCode initialSequence={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
