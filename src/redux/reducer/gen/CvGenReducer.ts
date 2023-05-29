import { CvGenModel } from "@/model/cv/gen/CvGenModel";

const initState = {
    cvGenPage: {},
    cvGenList: {}
};

const CvGenReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "CV_GEN_PAGE":
            return {
                ...state,
                cvGenPage: action.data
            };
        case "CV_GEN_LIST":
            return {
                ...state,
                cvGenList: action.data
            };
        case "DEL_CV_GEN":
            const newCvGenList: CvGenModel[] = state.cvGenList as CvGenModel[];
            let delId:number = action.data;
            return {
                ...state,
                cvGenList: newCvGenList.filter(e => e.id !== delId)
            };
        default:
            break;
    }
    return state;
};

export default CvGenReducer;

