export type cvEduAction = saveWorkAction | getEduListAction | delEduItemAction | getProjectExpDutyAction;

export enum ProjectExpActionType {
    SAVE_PROJECT,
    GET_PROJECT_LIST,
    DEL_PROJECT_ITEM,
    CLEAR_CURRENT_PROJECT,
    GET_PROJECT_EXP_DUTY
}

export interface saveWorkAction {
    type: ProjectExpActionType.SAVE_PROJECT;
    data: any;
}

export interface getEduListAction {
    type: ProjectExpActionType.GET_PROJECT_LIST;
    data: any;
}

export interface delEduItemAction {
    type: ProjectExpActionType.DEL_PROJECT_ITEM;
    data: any;
}

export interface clearCurrentWorkAction {
    type: ProjectExpActionType.CLEAR_CURRENT_PROJECT;
    data: any;
}

export interface getProjectExpDutyAction {
    type: ProjectExpActionType.GET_PROJECT_EXP_DUTY;
    data: any;
}