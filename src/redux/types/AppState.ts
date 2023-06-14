import { Cv } from "@/model/cv/Cv";
import { EduModel } from "@/model/cv/edu/EduModel";
import { CvGenModel } from "@/model/cv/gen/CvGenModel";
import { CvTpl } from "@/model/tpl/CvTpl";

export interface AppState {
    cv: {
        userCvList: Cv[],
        summary: Cv,
        currTpl: CvTpl
    },
    gen: {
        cvGenPage: {},
        cvGenList: CvGenModel[],
        genUpdateList: CvGenModel[],
    },
    edu: {
        savedEdu: {},
        eduList: EduModel[]
    },
    work: {
        savedWork: {},
        workList: [],
        workDuty: string
    },
    skill: {
        savedSkill: {},
        skillList: []
    },
    project: {
        savedProject: {},
        projectList: [],
        projectDuty: string
    },
    tpl: {
        tplList: CvTpl[],
        tpl: CvTpl
    }
}