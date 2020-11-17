import React from 'react'
import './styles/App.css'
import './styles/index.css'
import { Provider } from 'react-redux'
import Home from 'features/Home'
import Detail from 'features/Detail'
import Subscribe from 'components/Subscribe'
import store from 'store'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<Subscribe>
					<Router>
						<Switch>
							<Route exact path="/detail" component={Detail} />
							<Route path="/" component={Home} />
						</Switch>
					</Router>
				</Subscribe>
			</Provider>
		</div>
	)
}

export default App
