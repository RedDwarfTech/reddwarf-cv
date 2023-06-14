export type cvTplAction = submitGenTaskAction | getTplAction;

export enum CvTplActionType {
    GET_TPL_LIST,
    GET_TPL,
}

export interface submitGenTaskAction {
    type: CvTplActionType.GET_TPL_LIST;
    data: any;
}

export interface getTplAction {
    type: CvTplActionType.GET_TPL;
    data: any;
}