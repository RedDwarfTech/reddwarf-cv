const initState = {
    userCvList: {},
    summary: {}
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
        default:
            break;
    }
    return state;
};

export default CvReducer;


