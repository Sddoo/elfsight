import {useCallback, useState} from 'react';
import { useSelector } from "react-redux"
import { getCharacters } from 'rickmortyapi'

const useFetch = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const filters = useSelector((state) => state.filters);
	
	const request = useCallback(async () => {
		try {
			setLoading(true);
			const response = await getCharacters({...filters});
			
			if (response.status !== 200) throw new Error(response.statusMessage); // чекнуть другие примеры useFetch
			
			console.log("response", response);
			
			return response.data;
		} catch (e) {
			console.log("error", e)
			setError(true);
		} finally {
			console.log("finally")
			setLoading(false);
		}
	}, [filters]);
	
	const clearError = useCallback(() => setError(false), []);
	
	return {loading, error, request, clearError};
}

export default useFetch;