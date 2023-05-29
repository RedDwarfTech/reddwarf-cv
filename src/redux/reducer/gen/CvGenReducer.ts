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
        default:
            break;
    }
    return state;
};

export default CvGenReducer;


