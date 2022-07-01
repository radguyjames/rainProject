import React from "react";
import ManipulatePrecautionRequirement from './ManipulatePrecautionRequirement'
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
		precaution: (location.state ? location.state.detail.precaution : ""),
	}

	const handleOnPut = (values) => {
		axios.put('api/auth/precautionrequirements', values)
		.then(res => {
			history.push({pathname: "/apps/edit/precautionrequirements", state: {detail: {message: "Updated precaution option", severity: "success"}}})
		}).catch((error) => {
			console.log(error)
			history.push({pathname: "/apps/edit/precautionrequirements", state: {detail: {message: "Something went wrong!", severity: "error"}}})
		})
	}

	return (
		<Container maxWidth="md">
			<ManipulatePrecautionRequirement initialPrecautionRequirement={initial} type="Edit" onPost={values => handleOnPut(values)}/>
		</Container>
	);
};

export default App;
