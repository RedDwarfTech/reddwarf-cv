import { combineReducers } from 'redux';
import cv from "@/redux/reducer/cv/CvReducer";
import edu from "@/redux/reducer/cv/edu/EduReducer";
import work from "@/redux/reducer/cv/work/WorkReducer";

const rootReducer = combineReducers({
    cv,
    edu,
    work
});

export default rootReducer;
