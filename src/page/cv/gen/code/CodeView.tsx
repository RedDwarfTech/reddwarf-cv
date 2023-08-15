import OmsSyntaxHighlight from "./OmsSyntaxHighlight";

const CodeView: React.FC = () => {
    return (
        <div>
            <OmsSyntaxHighlight textContent={"\document"} language={"tex"}></OmsSyntaxHighlight>
        </div>
    );
}
export default CodeView;

