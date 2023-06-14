import { AppState } from "@/redux/types/AppState";

const initState: AppState["tpl"] = {
    tplList: []
};

const CvTplReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "GET_TPL_LIST":
            return {
                ...state,
                tplList: action.data
            };
        default:
            break;
    }
    return state;
};

export default CvTplReducer;


