export type cvEduAction = saveWorkAction | getEduListAction | delEduItemAction | getProjectExpDutyAction;

export enum ProjectExpActionType {
    SAVE_WORK,
    GET_WORK_LIST,
    DEL_WORK_ITEM,
    CLEAR_CURRENT_WORK,
    GET_PROJECT_EXP_DUTY
}

export interface saveWorkAction {
    type: ProjectExpActionType.SAVE_WORK;
    data: any;
}

export interface getEduListAction {
    type: ProjectExpActionType.GET_WORK_LIST;
    data: any;
}

export interface delEduItemAction {
    type: ProjectExpActionType.DEL_WORK_ITEM;
    data: any;
}

export interface clearCurrentWorkAction {
    type: ProjectExpActionType.CLEAR_CURRENT_WORK;
    data: any;
}

export interface getProjectExpDutyAction {
    type: ProjectExpActionType.GET_PROJECT_EXP_DUTY;
    data: any;
}