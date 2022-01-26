import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux"
import Angel from "../assets/angel.svg"
import { getCharacters } from 'rickmortyapi'
import { actionList } from "../store/reducer";

const StyledPagination = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px 0 100px 0;
`

const PageNumber = styled.div`
	width: 20px;
	height: 20px;
	text-align: center;
	margin: 0 3px;
	font-size: 18px;
	cursor: pointer;
	border: ${props => props.focus ? "1px solid black" : ""}
`

const Image = styled.img`
	cursor: pointer;
`

const Pagination = React.memo(() => {
	const [curPage, setCurPage] = useState(1);
	const info = useSelector((state) => state.info) || 1;
	const filters = useSelector((state) => state.filters);
	const dispatch = useDispatch();
	const pageNumbers = [];
	
	for (let count = 1; count <= info.pages; count++) {
		pageNumbers.push(count);
	}
	
	const changePage = async (nbr) => {
		if (nbr < 1) nbr = info.pages;
		else if (nbr > info.pages) nbr = 1;
		const characters = await getCharacters({...filters, page: nbr}); // добавить useFetch
		
		setCurPage(nbr);
		dispatch({type: actionList.setResults, payload: characters.data});
	}
	
	useEffect(() => {
		setCurPage(1);
	}, [filters])
	
	return (
		<StyledPagination>
			<Image
				src={Angel}
				alt="Previous page"
				style={{transform: "rotate(180deg)"}}
				onClick={() => changePage(curPage - 1)}/>
			{pageNumbers.map((nbr) => (
				<PageNumber
					key={nbr}
					focus={nbr === curPage}
					onClick={() => changePage(nbr)}
				>
					{nbr}
				</PageNumber>
			))}
			<Image
				src={Angel}
				alt="Next page"
				onClick={() => changePage(curPage + 1)}/>
		</StyledPagination>
	);
});

export default Pagination;