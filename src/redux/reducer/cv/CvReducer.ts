const initState = {
    userCvList: {}
};

const CvReducer = (state = initState, action: any) => {
    switch (action.type) {
        case "USER_CV_LIST":
            return {
                ...state,
                userCvList: action.data
            };
        default:
            break;
    }
    return state;
};

export default CvReducer;


