import React from "react";
import ManipulatePrecautionRequirement from './ManipulatePrecautionRequirement'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();
  
    const initial = {
        id: null,
        precaution: null,
    }
  
    const handleOnPost = (values) => {
        axios.post('api/auth/precautionrequirements', values)
            .then(res => {
                history.push({pathname: "/apps/edit/precautionrequirements", state: {detail: {message: "Created precaution option", severity: "success"}}})
            }).catch((error) => {
                console.log(error)
                history.push({pathname: "/apps/edit/precautionrequirements", state: {detail: {message: "Something went wrong!", severity: "error"}}})
            })
    }
  
    return (
        <Container maxWidth="md">
            <ManipulatePrecautionRequirement initialPrecautionRequirement={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
