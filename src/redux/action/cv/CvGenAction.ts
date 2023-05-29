export type cvGenAction = submitGenTaskAction | cvGenPageAction | delCvGenAction;

export enum CvGenActionType {
    SUBMIT_TASK,
    CV_GEN_PAGE,
    CV_GEN_LIST,
    DEL_CV_GEN
}

export interface submitGenTaskAction {
    type: CvGenActionType.SUBMIT_TASK;
    data: any;
}

export interface cvGenPageAction {
    type: CvGenActionType.CV_GEN_PAGE;
    data: any;
}

export interface cvGenListAction {
    type: CvGenActionType.CV_GEN_LIST;
    data: any;
}

export interface delCvGenAction {
    type: CvGenActionType.DEL_CV_GEN;
    data: any;
}