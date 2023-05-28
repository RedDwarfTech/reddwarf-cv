export type cvGenAction = submitGenTaskAction ;

export enum CvGenActionType {
    SUBMIT_TASK,
    
}

export interface submitGenTaskAction {
    type: CvGenActionType.SUBMIT_TASK;
    data: any;
}
