export type cvAction = getCvListAction | editCvSummaryAction | getCvSummaryAction | clearCvSummaryAction | deleteUserCvAction | updateCvOrderAction | setCurrMainColorAction|setCurrThemeAction;

export enum CvActionType {
    USER_CV_LIST,
    EDIT_CV_SUMMAY,
    GET_CV_SUMMAY,
    CLEAR_CV_SUMMAY,
    DELETE_USER_CV,
    UPDATE_CV_ORDER,
    COPY_CV_SUMMAY,
    SET_CURR_TPL,
    SET_CURR_MAIN_COLOR,
    SET_CURR_MAIN_THEME
}

export interface getCvListAction {
    type: CvActionType.USER_CV_LIST;
    data: any;
}

export interface editCvSummaryAction {
    type: CvActionType.EDIT_CV_SUMMAY;
    data: any;
}

export interface getCvSummaryAction {
    type: CvActionType.GET_CV_SUMMAY;
    data: any;
}

export interface clearCvSummaryAction {
    type: CvActionType.CLEAR_CV_SUMMAY;
    data: any;
}

export interface deleteUserCvAction {
    type: CvActionType.DELETE_USER_CV;
    data: any;
}

export interface updateCvOrderAction {
    type: CvActionType.UPDATE_CV_ORDER;
    data: any;
}

export interface copyCvSummaryAction {
    type: CvActionType.COPY_CV_SUMMAY;
    data: any;
}

export interface setCurrMainColorAction {
    type: CvActionType.SET_CURR_MAIN_COLOR;
    data: any;
}

export interface setCurrThemeAction {
    type: CvActionType.SET_CURR_MAIN_THEME;
    data: any;
}