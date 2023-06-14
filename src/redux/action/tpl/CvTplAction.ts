export type cvTplAction = submitGenTaskAction;

export enum CvTplActionType {
    GET_TPL_LIST,
}

export interface submitGenTaskAction {
    type: CvTplActionType.GET_TPL_LIST;
    data: any;
}
