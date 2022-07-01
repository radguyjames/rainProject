import React from "react";
import ManipulateSedationRequirement from './ManipulateSedationRequirement'
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
		sedationRequirement: (location.state ? location.state.detail.sedationRequirement : ""),
        message: (location.state ? location.state.detail.message : ""),
	}

	const handleOnPut = (values) => {
		axios.put('api/auth/sedationrequirements', values)
		.then(res => {
			history.push({pathname: "/apps/edit/sedationrequirements", state: {detail: {message: "Updated sedation option", severity: "success"}}})
		}).catch((error) => {
			console.log(error)
			history.push({pathname: "/apps/edit/sedationrequirements", state: {detail: {message: "Something went wrong!", severity: "error"}}})
		})
	}

	return (
		<Container maxWidth="md">
			<ManipulateSedationRequirement initialSedationRequirement={initial} type="Edit" onPost={values => handleOnPut(values)}/>
		</Container>
	);
};

export default App;
