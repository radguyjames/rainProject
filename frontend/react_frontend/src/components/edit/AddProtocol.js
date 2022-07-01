import React from "react";
import ManipulateProtocol from './ManipulateProtocol'
import {
  Container,
} from "@material-ui/core";
import axios from 'axios'
import { useHistory } from "react-router";

const App = () => {
  const history = useHistory();
  
  const sampleProtocol = {
    id: null,
    protocol: null,
    type: null,
    examTime: 0,
    examCodes: [],
    sequences: [],
    keywords: [],
  };
  
  const handleOnPost = (values) => {
    axios.post('api/auth/protocols', values)
      .then(res => {
        history.push({pathname: "/apps/edit/protocols", state: {detail: {message: "Created protocol", severity: "success"}}})
      }).catch((error) => {
          console.log(error)
          history.push({pathname: "/apps/edit/protocols", state: {detail: {message: "Something went wrong!", severity: "error"}}})
      })
  }
  
  return (
    <Container maxWidth="md">
      <ManipulateProtocol initialProtocol={sampleProtocol} type="Add" onPost={values => handleOnPost(values)}/>
    </Container>
  );
};

export default App;
