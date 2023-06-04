import { combineReducers } from 'redux';
import cv from "@/redux/reducer/cv/CvReducer";
import edu from "@/redux/reducer/cv/edu/EduReducer";
import work from "@/redux/reducer/cv/work/WorkReducer";
import gen from "@/redux/reducer/gen/CvGenReducer";
import skill from "@/redux/reducer/cv/skills/SkillReducer";
import project from "@/redux/reducer/cv/project/ProjectReducer";
import { rdRootReducer } from 'rd-component';

const rootReducer = combineReducers({
    cv,
    edu,
    work,
    rdRootReducer,
    gen,
    skill,
    project
});

export default rootReducer;
