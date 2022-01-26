import React, {useState} from 'react';
import styled from "styled-components";
import { useSelector } from "react-redux"
import cross from "../assets/cross.svg"

const StyledResults = styled.div`

`

const Characters = styled.div`

`

const Character = styled.div`
	height: 200px;
	display: flex;
	margin: 10px 0;
	cursor: pointer;
`

const Image = styled.img`
	margin-right: 10px;
`

const Info = styled.div`
`

const Field = styled.div`
	margin: 10px;
`

const Popup = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`

const CharacterDetail = styled.div`

`

const PopupContent = styled.div`
	position: relative;
	padding: 20px;
	background-color: white;
`

const CloseButton = styled.img`
	position: absolute;
	top: 0;
	right: 0;
	width: 20px;
	height: 20px;
	cursor: pointer;
`

const Results = React.memo(({error}) => {
	const characters = useSelector((state) => state.results);
	const [popupCharacter, setPopupCharacter] = useState(null)
	
	if (popupCharacter) console.log("popupCharacter", Object.keys(popupCharacter), popupCharacter);
	
	return (
		<StyledResults>
			{characters.length && !error ?
			<Characters>
				{characters.map((character) => (
					<Character key={character.id} onClick={() => setPopupCharacter(character)}>
						<Image src={character.image} alt={character.name}/>
						<Info>
							<Field>Name: {character.name || "unknown"}</Field>
							<Field>Status: {character.status || "unknown"}</Field>
							<Field>Species: {character.species || "unknown"}</Field>
							<Field>Type: {character.type || "unknown"}</Field>
							<Field>Gender: {character.gender || "unknown"}</Field>
						</Info>
					</Character>
				))}
			</Characters> :
			<div>No data</div>}
			
			{popupCharacter &&
				<Popup onClick={() => setPopupCharacter(null)}>
					<PopupContent onClick={(e) => e.stopPropagation()}>
						<CloseButton src={cross} alt="Закрыть" onClick={() => setPopupCharacter(null)} />
						<img src={popupCharacter.image} alt={popupCharacter.name}/>
						{Object.keys(popupCharacter).map((detail, id) => {
							if (typeof popupCharacter[detail] === "object") return <></>;
							return (<CharacterDetail key={id}>{detail}: {popupCharacter[detail] || "unknown"}</CharacterDetail>)
						})}
					</PopupContent>
				</Popup>
			}
		</StyledResults>
	);
});

export default Results;