import React, { useState } from 'react'
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { actionList } from "../store/reducer";

const StyledFilters = styled.div`
	display: flex;
	justify-content: space-between;
`

const StyledLabel = styled.label`
	display: flex;
	flex-direction: column;
	text-align: center;
`

const Filters = React.memo(() => {
	const dispatch = useDispatch();
	const [fields, setFields] = useState({
		name: '',
		status: '',
		species: '',
		type: '',
		gender: ''
	});
	
	const changeHandler = (e) => {
		setFields({...fields, [e.target.name]: e.target.value})
	}
	
	const filter = () => {
		dispatch({type: actionList.setFilters, payload: fields})
	}
	
	return (
		<StyledFilters>
			{Object.keys(fields).map((fieldKey) => (
				<StyledLabel htmlFor={fieldKey} key={fieldKey}>
					{fieldKey}
					<input type="text" name={fieldKey} value={fields[fieldKey]} onChange={changeHandler}/>
				</StyledLabel>
			))}
			<button onClick={filter}>Filter!</button>
		</StyledFilters>
	);
});

export default Filters;