import React from "react";
import ManipulateKeyword from './ManipulateKeyword'
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
		keyword: (location.state ? location.state.detail.keyword : ""),
    	points: (location.state ? location.state.detail.points : 0),
		type: (location.state ? location.state.detail.type : null)
	}

	const handleOnPut = (values) => {
		axios.put('api/auth/keywords', values)
		.then(res => {
			history.push({pathname: "/apps/edit/keywords", state: {detail: {message: "Updated keyword", severity: "success"}}})
		}).catch((error) => {
			console.log(error)
			history.push({pathname: "/apps/edit/keywords", state: {detail: {message: "Something went wrong!", severity: "error"}}})
		})
	}

	return (
		<Container maxWidth="md">
			<ManipulateKeyword initialKeyword={initial} type="Edit" onPost={values => handleOnPut(values)}/>
		</Container>
	);
};

export default App;
