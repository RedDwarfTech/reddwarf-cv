export type cvEduAction = saveEduAction | getEduListAction | delEduItemAction;

export enum EduActionType {
    SAVE_EDU,
    GET_EDU_LIST,
    GET_WORK_LIST,
    DEL_EDU_ITEM
}

export interface saveEduAction {
    type: EduActionType.SAVE_EDU;
    data: any;
}

export interface getEduListAction {
    type: EduActionType.GET_EDU_LIST;
    data: any;
}

export interface delEduItemAction {
    type: EduActionType.DEL_EDU_ITEM;
    data: any;
}