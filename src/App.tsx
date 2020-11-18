import React from 'react'
import './styles/App.css'
import './styles/index.css'
import { Provider } from 'react-redux'
import Home from 'features/Home'
import Detail from 'features/Detail'
import Subscribe from 'components/Subscribe'
import store from 'store'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { AuthRoute, ProtectedRoute } from './utils/routeUtils'
import SignUp from 'features/SignUp'

export const persistor = persistStore(store)

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
						<Router>
							<ProtectedRoute component={Subscribe} />
							<Switch>
								<AuthRoute path="/signup" component={SignUp} />
								<ProtectedRoute exact path="/detail" component={Detail} />
								<ProtectedRoute path="/" component={Home} />
							</Switch>
						</Router>
					
				</PersistGate>
			</Provider>
		</div>
	)
}

export default App
