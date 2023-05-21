export type cvAction = getCvListAction;

export enum CvActionType {
    USER_CV_LIST,
}

export interface getCvListAction {
    type: CvActionType.USER_CV_LIST;
    data: any;
}