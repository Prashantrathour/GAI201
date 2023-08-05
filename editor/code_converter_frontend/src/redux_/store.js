import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import codeReducer from "./Convertor/reducer"
import thunk from "redux-thunk"
const rootreducer=combineReducers({codeReducer})
export const store=legacy_createStore(rootreducer,applyMiddleware(thunk))