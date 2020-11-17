import React from 'react'
import './styles/App.css'
import './styles/index.css'
import { Provider } from 'react-redux'
import Home from 'features/Home'
import store from 'store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path="/" component={Home} />
						<Route path="/detail" component={Home} />
					</Switch>
				</Router>
			</Provider>
		</div>
	)
}

export default App
