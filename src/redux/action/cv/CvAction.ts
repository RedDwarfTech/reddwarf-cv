export type cvAction = getCvListAction | editCvSummaryAction | getCvSummaryAction | clearCvSummaryAction | deleteUserCvAction;

export enum CvActionType {
    USER_CV_LIST,
    EDIT_CV_SUMMAY,
    GET_CV_SUMMAY,
    CLEAR_CV_SUMMAY,
    DELETE_USER_CV,
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