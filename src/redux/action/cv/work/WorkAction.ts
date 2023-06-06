export type cvEduAction = saveWorkAction | getEduListAction | delEduItemAction | getWorkGenDutyAction;

export enum WorkActionType {
    SAVE_WORK,
    GET_WORK_LIST,
    DEL_WORK_ITEM,
    CLEAR_CURRENT_WORK,
    GET_WORK_EXP_DUTY
}

export interface saveWorkAction {
    type: WorkActionType.SAVE_WORK;
    data: any;
}

export interface getEduListAction {
    type: WorkActionType.GET_WORK_LIST;
    data: any;
}

export interface delEduItemAction {
    type: WorkActionType.DEL_WORK_ITEM;
    data: any;
}

export interface clearCurrentWorkAction {
    type: WorkActionType.CLEAR_CURRENT_WORK;
    data: any;
}

export interface getWorkGenDutyAction {
    type: WorkActionType.GET_WORK_EXP_DUTY;
    data: any;
}