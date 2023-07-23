import { withConnect } from "rd-component";
import React from "react";
import CvCodeEditor from "@/component/common/editor/CvCodeEditor";

const Experience: React.FC = () => {

    return (
        <div>
            <CvCodeEditor />
        </div>
    );
}

export default withConnect(Experience);