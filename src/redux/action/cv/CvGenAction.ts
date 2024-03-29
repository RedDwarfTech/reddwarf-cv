export type cvGenAction = submitGenTaskAction | cvGenPageAction | delCvGenAction | getTexSrcAction;

export enum CvGenActionType {
    SUBMIT_TASK,
    CV_GEN_PAGE,
    CV_GEN_LIST,
    DEL_CV_GEN,
    CHECK_GEN_STATUS,
    GET_TEX_SRC
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

export interface checkGenStatusAction {
    type: CvGenActionType.CHECK_GEN_STATUS;
    data: any;
}

export interface getTexSrcAction {
    type: CvGenActionType.GET_TEX_SRC;
    data: any;
}