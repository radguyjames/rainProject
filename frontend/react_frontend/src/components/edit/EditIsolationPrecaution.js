import React from "react";
import ManipulateIsolationPrecaution from './ManipulateIsolationPrecaution'
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
		isolationPrecaution: (location.state ? location.state.detail.isolationPrecaution : ""),
		requirements: (location.state ? location.state.detail.requirements: null)
	}

	const handleOnPut = (values) => {
		axios.put('api/auth/isolationprecautions', values)
		.then(res => {
			history.push({pathname: "/apps/edit/isolationprecautions", state: {detail: {message: "Updated isolation option", severity: "success"}}})
		}).catch((error) => {
			console.log(error)
			history.push({pathname: "/apps/edit/isolationprecautions", state: {detail: {message: "Something went wrong!", severity: "error"}}})
		})
	}

	return (
		<Container maxWidth="md">
			<ManipulateIsolationPrecaution initialIsolationPrecaution={initial} type="Edit" onPost={values => handleOnPut(values)}/>
		</Container>
	);
};

export default App;
