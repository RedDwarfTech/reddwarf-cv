export type cvEduAction = saveWorkAction | getEduListAction | delEduItemAction;

export enum WorkActionType {
    SAVE_WORK,
    GET_EDU_LIST,
    DEL_EDU_ITEM,
    CLEAR_WORK
}

export interface saveWorkAction {
    type: WorkActionType.SAVE_WORK;
    data: any;
}

export interface getEduListAction {
    type: WorkActionType.GET_EDU_LIST;
    data: any;
}

export interface delEduItemAction {
    type: WorkActionType.DEL_EDU_ITEM;
    data: any;
}