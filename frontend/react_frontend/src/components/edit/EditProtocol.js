import React from "react";
import ManipulateProtocol from './ManipulateProtocol'
import {
  Container,
} from "@material-ui/core";
import axios from 'axios'
import { useLocation, useHistory } from "react-router";

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const sampleProtocol = {
    id: (location.state ? location.state.detail.id : null),
    protocol: (location.state ? location.state.detail.protocol : null),
    type: (location.state ? location.state.detail.type : 1),
    examTime: (location.state ? location.state.detail.examTime : 0),
    examCodes: (location.state ? location.state.detail.examCodes : []),
    sequences: (location.state ? location.state.detail.sequences : []),
    keywords: (location.state ? location.state.detail.keywords: [])
  };
  
  const handleOnPut = (values) => {
    axios.put('api/auth/protocols', values)
      .then(res => {
        history.push({pathname: "/apps/edit/protocols", state: {detail: {message: "Updated protocol", severity: "success"}}})
      }).catch((error) => {
        console.log(error);
        history.push({pathname: "/apps/edit/protocols", state: {detail: {message: "Something went wrong!", severity: "error"}}})
      })
  }
  
  return (
    <Container maxWidth="md">
      <ManipulateProtocol initialProtocol={sampleProtocol} type="Edit" onPost={values => handleOnPut(values)}/>
    </Container>
  );
};

export default App;
