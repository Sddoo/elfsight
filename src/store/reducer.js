export const actionList = {
	setFilters: "SET_FILTERS",
	setResults: "SET_RESULTS",
	setShownResults: "SET_SHOWN_RESULTS",
	setError: "SET_ERROR"
}

export const defaultState = {
	filters: {},
	info: {},
	results: {},
	error: {}
}

function reducer(state = defaultState, action) {
	switch (action.type) {
		case actionList.setFilters: {
			return {...state, filters: action.payload}
		}
		case actionList.setResults: {
			if (!action.payload) {
				action.payload = {
					results: [],
					info: {pages: 1}
				}
			}
			return {...state, results: action.payload.results, info: action.payload.info}
		}
		case actionList.setError: {
			return {...state, error: action.payload}
		}
		default:
			return state
	}
	
}

export default reducer;