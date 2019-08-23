import reducer from "./reducer";
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

const middlewares = [];
middlewares.push(thunk);
const reducers = combineReducers({
    reducer: reducer
});

export default createStore(reducers, composeWithDevTools(
    applyMiddleware(...middlewares)
));
