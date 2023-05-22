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
        default:
            break;
    }
    return state;
};

export default EduReducer;


