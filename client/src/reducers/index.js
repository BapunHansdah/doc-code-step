//for combining the reducers

import {defaultObj,setCodeValue } from "./List";
import { combineReducers } from "redux";
const reducers = combineReducers({defaultObj,setCodeValue });
export default reducers;