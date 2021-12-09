import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import MainRoute from './MainRoute';
import {Provider} from 'react-redux';
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from './redux/store';


export function App() {
  return (
    <Provider store={store}>
		<Router>
			<Switch>
				<PersistGate persistor={persistor}>
					< MainRoute />
				</PersistGate>
			  </Switch>
		</Router>
	</Provider>
  );
}

export default App;
