import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers/index.js";
const store = createStore(reducers, compose(applyMiddleware(reduxThunk)));
export default store;
