import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Initialisation from './pages/initialisation/Initialisation';
import Jeu from './pages/jeu/Jeu';
import Rejouer from './pages/rejouer/Rejouer';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from "react-redux";
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom'
import reducer from './reducers/reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    game: reducer,
    form: formReducer
});

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Initialisation}/>
                <Route path="/le-pendu/jeu" component={Jeu}/>
                <Route path="/le-pendu/fin" component={Rejouer}/>
            </Switch>
        </HashRouter>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
