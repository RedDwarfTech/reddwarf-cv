import React, { useState } from "react";
const OmsSyntaxHighlight = React.lazy(() => import('./OmsSyntaxHighlight'));
import { AppState } from "@/redux/types/AppState";
import { useSelector } from "react-redux";
import { getSrc } from "@/service/cv/CvGenService";
import queryString from 'query-string';

const CodeView: React.FC = () => {

    const { cvSrc } = useSelector((state: AppState) => state.gen);
    const [cvTexSource, setCvTexSource] = useState<String>('loading');

    React.useEffect(() => {
        const params = queryString.parse(window.location.search);
        if (params && params.id) {
            getSrc(Number(params.id));
        }
    }, []);

    React.useEffect(() => {
        setCvTexSource(cvSrc);
    }, [cvSrc]);

    return (
        <div>
            <React.Suspense fallback={<div>Loading...</div>}>
                <OmsSyntaxHighlight textContent={cvTexSource.toString()} language={"tex"}></OmsSyntaxHighlight>
            </React.Suspense>
        </div>
    );
}
export default CodeView;