import { EduModel } from "@/model/cv/edu/EduModel";

const initState = {
    savedEdu: {},
    eduList: {}
};

const EduReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "SAVE_EDU":
            return {
                ...state,
                savedEdu: action.data
            };
        case "GET_EDU_LIST":
            return {
                ...state,
                eduList: action.data
            };
        case "DEL_EDU_ITEM":
            const newEduList: EduModel[] = state.eduList as EduModel[];
            let delId:number = action.data;
            return {
                ...state,
                eduList: newEduList.filter(e => e.id !== delId)
            };
        default:
            break;
    }
    return state;
};

export default EduReducer;


