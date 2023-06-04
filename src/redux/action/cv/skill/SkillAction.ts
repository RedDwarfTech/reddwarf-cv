export type cvSkillAction = saveSkillAction | getSkillListAction | delSkillItemAction;

export enum SkillActionType {
    SAVE_SKILL,
    GET_SKILL_LIST,
    DEL_SKILL_ITEM,
    CLEAR_CURRENT_SKILL
}

export interface saveSkillAction {
    type: SkillActionType.SAVE_SKILL;
    data: any;
}

export interface getSkillListAction {
    type: SkillActionType.GET_SKILL_LIST;
    data: any;
}

export interface delSkillItemAction {
    type: SkillActionType.DEL_SKILL_ITEM;
    data: any;
}

export interface clearCurrentSkillAction {
    type: SkillActionType.CLEAR_CURRENT_SKILL;
    data: any;
}