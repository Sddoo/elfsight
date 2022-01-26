import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createGlobalStyle } from 'styled-components'
import { Provider } from "react-redux"
import store from "./store/store"

const GlobalStyle = createGlobalStyle`
	body {
	  padding: 0;
	  margin: 0;
	  box-sizing: border-box;
	}
`

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<GlobalStyle/>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

