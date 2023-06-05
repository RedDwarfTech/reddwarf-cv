import { ProjectExpModel } from "@/model/cv/project/ProjectExpModel";
import { AppState } from "@/redux/types/AppState";

const initState: AppState["project"] = {
    savedProject: {},
    projectList: [],
    projectDuty: "",
};

const ProjectReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "SAVE_WORK":
            return {
                ...state,
                savedProject: action.data
            };
        case "GET_WORK_LIST":
            return {
                ...state,
                projectList: action.data
            };
        case "CLEAR_CURRENT_WORK":
            return {
                ...state,
                savedWork: action.data
            };
        case "GET_PROJECT_EXP_DUTY":
            return {
                ...state,
                projectDuty: action.data
            };
        case "DEL_WORK_ITEM":
            const newEduList: ProjectExpModel[] = state.projectList as ProjectExpModel[];
            let delId: number = action.data;
            return {
                ...state,
                projectList: newEduList.filter(e => e.id !== delId)
            };
        default:
            break;
    }
    return state;
};

export default ProjectReducer;


