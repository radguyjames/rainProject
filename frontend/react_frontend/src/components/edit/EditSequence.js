import React from "react";
import ManipulateSequence from './ManipulateSequence'
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
		sequence: (location.state ? location.state.detail.sequence : "")
	}

	const handleOnPut = (values) => {
		axios.put('api/auth/sequences', values)
		.then(res => {
			history.push({pathname: "/apps/edit/sequences", state: {detail: {message: "Updated sequence", severity: "success"}}})
		}).catch((error) => {
			console.log(error)
			history.push({pathname: "/apps/edit/sequences", state: {detail: {message: "Something went wrong!", severity: "error"}}})
		})
	}

	return (
		<Container maxWidth="md">
			<ManipulateSequence initialSequence={initial} type="Edit" onPost={values => handleOnPut(values)}/>
		</Container>
	);
};

export default App;
