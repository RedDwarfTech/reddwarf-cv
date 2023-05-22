import { combineReducers } from 'redux';
import cv from "@/redux/reducer/cv/CvReducer";
import edu from "@/redux/reducer/cv/edu/EduReducer";

const rootReducer = combineReducers({
    cv,
    edu
});

export default rootReducer;
