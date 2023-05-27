import { WorkModel } from "@/model/cv/work/WorkModel";

const initState = {
    savedWork: {},
    workList: {}
};

const WorkReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "SAVE_WORK":
            return {
                ...state,
                savedWork: action.data
            };
        case "GET_WORK_LIST":
            return {
                ...state,
                workList: action.data
            };
        case "DEL_WORK_ITEM":
            const newEduList: WorkModel[] = state.workList as WorkModel[];
            let delId:number = action.data;
            return {
                ...state,
                workList: newEduList.filter(e => e.id !== delId)
            };
        default:
            break;
    }
    return state;
};

export default WorkReducer;


