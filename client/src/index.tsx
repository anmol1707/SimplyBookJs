import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import createStore from './redux/store';
import SignIn from "./pages/Signin";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Welcome from "./pages/Welcome";
import SelectSeat from "./pages/SelectSeat";
import BookingHistory from "./pages/BookingHistory";

ReactDOM.render(
    <Provider store={createStore}>
        <Router>
            <App/>
            <Route path="/" exact component={SignIn}/>
            <Route path="/welcome" exact component={Welcome}/>
            <Route path="/select-seat" exact component={SelectSeat}/>
            <Route path="/booking-history" exact component={BookingHistory}/>
        </Router>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
