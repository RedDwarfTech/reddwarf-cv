import { Cv } from "@/model/cv/Cv";
import { CvGenModel } from "@/model/cv/gen/CvGenModel";

export interface AppState {
    cv: {
        userCvList: Cv[],
        summary: {}
    },
    gen: {
        cvGenPage: {},
        cvGenList: CvGenModel[],
    }
}