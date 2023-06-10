import { Cv } from "@/model/cv/Cv";
import { EduModel } from "@/model/cv/edu/EduModel";
import { CvGenModel } from "@/model/cv/gen/CvGenModel";

export interface AppState {
    cv: {
        userCvList: Cv[],
        summary: Cv
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
    }
}