import React from "react";
import ManipulateSedationRequirement from './ManipulateSedationRequirement'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();
  
    const initial = {
        id: null,
        sedationRequirement: null,
        message: "",
    }
  
    const handleOnPost = (values) => {
        axios.post('api/auth/sedationrequirements', values)
            .then(res => {
                history.push({pathname: "/apps/edit/sedationrequirements", state: {detail: {message: "Created sedation option", severity: "success"}}})
            }).catch((error) => {
                console.log(error)
                history.push({pathname: "/apps/edit/sedationrequirements", state: {detail: {message: "Something went wrong!", severity: "error"}}})
            })
    }
  
    return (
        <Container maxWidth="md">
            <ManipulateSedationRequirement initialSedationRequirement={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
