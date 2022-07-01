import React from "react";
import ManipulateMobilityRequirement from './ManipulateMobilityRequirement'
import {
    Container,
} from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const App = () => {
    const history = useHistory();
  
    const initial = {
        id: null,
        mobilityRequirement: null,
    }
  
    const handleOnPost = (values) => {
        axios.post('api/auth/mobilityrequirements', values)
            .then(res => {
                history.push({pathname: "/apps/edit/mobilityrequirements", state: {detail: {message: "Created mobility option", severity: "success"}}})
            }).catch((error) => {
                console.log(error)
                history.push({pathname: "/apps/edit/mobilityrequirements", state: {detail: {message: "Something went wrong!", severity: "error"}}})
            })
    }
  
    return (
        <Container maxWidth="md">
            <ManipulateMobilityRequirement initialMobilityRequirement={initial} type="Add" onPost={values => handleOnPost(values)} />
        </Container>
    );
};

export default App;
