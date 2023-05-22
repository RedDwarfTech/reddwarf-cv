export type cvAction = getCvListAction | editCvSummaryAction | getCvSummaryAction;

export enum CvActionType {
    USER_CV_LIST,
    EDIT_CV_SUMMAY,
    GET_CV_SUMMAY
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
