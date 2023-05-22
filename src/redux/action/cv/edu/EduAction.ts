export type cvEduAction = saveEduAction | getEduListAction;

export enum EduActionType {
    SAVE_EDU,
    GET_EDU_LIST,
}

export interface saveEduAction {
    type: EduActionType.SAVE_EDU;
    data: any;
}

export interface getEduListAction {
    type: EduActionType.GET_EDU_LIST;
    data: any;
}