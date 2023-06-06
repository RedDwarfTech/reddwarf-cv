import { CvGenModel } from "@/model/cv/gen/CvGenModel";
import { AppState } from "@/redux/types/AppState";

const initState: AppState["gen"] = {
    cvGenPage: {},
    cvGenList: []
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
            let delId: number = action.data;
            return {
                ...state,
                cvGenList: newCvGenList.filter(e => e.id !== delId)
            };
        case "CHECK_GEN_STATUS":
            const newCvGenList1: CvGenModel[] = state.cvGenList as CvGenModel[];
            let fetchedRecord = action.data as CvGenModel[];
            let newList: CvGenModel[] = [];
            if (newCvGenList1 && newCvGenList1.length > 0) {
                newCvGenList1.forEach(item => {
                    if (item.gen_status !== 2) {
                        const fetched = fetchedRecord.find(item1 => item1.id === item.id);
                        if (fetched && fetched.gen_status !== item.gen_status) {
                            item.gen_status == fetched.gen_status;
                        }
                    }
                    newList.push(item);
                });
            }
            return {
                ...state,
                cvGenList: newList
            };
        default:
            break;
    }
    return state;
};

export default CvGenReducer;


