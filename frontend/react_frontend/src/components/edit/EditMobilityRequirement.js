import React from "react";
import ManipulateMobilityRequirement from './ManipulateMobilityRequirement'
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
		mobilityRequirement: (location.state ? location.state.detail.mobilityRequirement : ""),
	}

	const handleOnPut = (values) => {
		axios.put('api/auth/mobilityrequirements', values)
		.then(res => {
			history.push({pathname: "/apps/edit/mobilityrequirements", state: {detail: {message: "Updated mobility option", severity: "success"}}})
		}).catch((error) => {
			console.log(error)
			history.push({pathname: "/apps/edit/mobilityrequirements", state: {detail: {message: "Something went wrong!", severity: "error"}}})
		})
	}

	return (
		<Container maxWidth="md">
			<ManipulateMobilityRequirement initialMobilityRequirement={initial} type="Edit" onPost={values => handleOnPut(values)}/>
		</Container>
	);
};

export default App;
