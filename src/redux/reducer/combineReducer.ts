import { combineReducers } from 'redux';
import cv from "@/redux/reducer/cv/CvReducer";

const rootReducer = combineReducers({
    cv
});

export default rootReducer;
