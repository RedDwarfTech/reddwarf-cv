export type cvLangAction = saveLangAction | getLangListAction | delLangItemAction;

export enum LangActionType {
    SAVE_LANG,
    GET_LANG_LIST,
    DEL_LANG_ITEM,
    CLEAR_CURRENT_LANG
}

export interface saveLangAction {
    type: LangActionType.SAVE_LANG;
    data: any;
}

export interface getLangListAction {
    type: LangActionType.GET_LANG_LIST;
    data: any;
}

export interface delLangItemAction {
    type: LangActionType.DEL_LANG_ITEM;
    data: any;
}

export interface clearCurrentLangAction {
    type: LangActionType.CLEAR_CURRENT_LANG;
    data: any;
}