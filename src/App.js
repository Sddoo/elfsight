import React, {useEffect} from "react"
import styled from 'styled-components'
import Filters from './components/Filters'
import Results from './components/Results'
import Pagination from "./components/Pagination";
import {useDispatch, useSelector} from "react-redux"
import { actionList } from "./store/reducer"
import useFetch from "./hooks/useFetch";

const StyledApp = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const FiltersWrap = styled.div`
	width: 1000px;
	margin-bottom: 20px;
`

const ResultsWrap = styled.div`
	width: 1000px;
`

const App = React.memo(() => {
	const dispatch = useDispatch();
	const filters = useSelector((state) => state.filters);
	const {request, error, clearError} = useFetch();
	
	useEffect(() => {
		
		async function fetchData () { // добавить нормальную обработку ошибок
			const characters = await request();
			
			dispatch({type: actionList.setResults, payload: characters});
			clearError();
		}
		
		fetchData();
	}, [filters]);
	
	return (
		<StyledApp>
			<FiltersWrap>
				<Filters />
			</FiltersWrap>
			<ResultsWrap>
				<Results error={error}/>
			</ResultsWrap>
			<Pagination/>
		</StyledApp>
	);
});

export default App;
