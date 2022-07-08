import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./Reducers/RootReducer";

export default createStore(RootReducer, compose(applyMiddleware(thunk)));
