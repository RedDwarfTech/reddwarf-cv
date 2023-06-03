export type cvEduAction = saveEduAction | getEduListAction | delEduItemAction | clearCurrentEduAction;

export enum EduActionType {
    SAVE_EDU,
    GET_EDU_LIST,
    DEL_EDU_ITEM,
    CLEAR_CURRENT_EDU
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

export interface clearCurrentEduAction {
    type: EduActionType.CLEAR_CURRENT_EDU;
    data: any;
}