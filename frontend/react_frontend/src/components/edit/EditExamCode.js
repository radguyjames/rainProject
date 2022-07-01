import React from "react";
import ManipulateExamCode from './ManipulateExamCode'
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
		examCode: (location.state ? location.state.detail.examCode : "")
	}

	const handleOnPut = (values) => {
		axios.put('api/auth/examcodes', values)
		.then(res => {
			history.push({pathname: "/apps/edit/examcodes", state: {detail: {message: "Updated exam code", severity: "success"}}})
		}).catch((error) => {
			console.log(error)
			history.push({pathname: "/apps/edit/examcodes", state: {detail: {message: "Something went wrong!", severity: "error"}}})
		})
	}

	return (
		<Container maxWidth="md">
			<ManipulateExamCode initialSequence={initial} type="Edit" onPost={values => handleOnPut(values)}/>
		</Container>
	);
};

export default App;
