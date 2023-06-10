import { Cv } from "@/model/cv/Cv";
import { AppState } from "@/redux/types/AppState";

const initState: AppState["cv"] = {
    userCvList: [],
    summary: {} as Cv
};

const CvReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "USER_CV_LIST":
            return {
                ...state,
                userCvList: action.data
            };
        case "EDIT_CV_SUMMAY":
            return {
                ...state,
                summary: action.data
            };
        case "GET_CV_SUMMAY":
            return {
                ...state,
                summary: action.data
            };
        case "CLEAR_CV_SUMMAY":
            return {
                ...state,
                summary: {}
            };
        case "UPDATE_CV_ORDER":
            return {
                ...state,
                summary: action.data
            };
        case "DELETE_USER_CV":
            let legacyUserCvList: Cv[] = state.userCvList;
            let filtered = legacyUserCvList.filter(item=>item.id !== action.data);
            return {
                ...state,
                userCvList: filtered
            };
        default:
            break;
    }
    return state;
};

export default CvReducer;


