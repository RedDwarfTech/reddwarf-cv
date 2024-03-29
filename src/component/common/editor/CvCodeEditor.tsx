import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  StreamLanguage,
} from '@codemirror/language'
import { stex } from '@codemirror/legacy-modes/mode/stex';

const extensions = [
  EditorView.contentAttributes.of({ spellcheck: 'true' }),
  EditorView.lineWrapping,
  EditorView.theme({
    '.cm-content': {
      maxWidth: '50em',
    },
    '.cm-scroller': {
      maxHeight: '75vh',
      minHeight: '45vh',
    },
  }),
  StreamLanguage.define(stex),
  syntaxHighlighting(defaultHighlightStyle),
]
const CvCodeEditor: React.FC = () => {
  const edContainer = useRef<any>();

  useEffect(() => {
    const view = new EditorView({
      doc: "hello world!\nsdfsdf", 
      parent: edContainer.current,
      extensions: [basicSetup,extensions]
    });

    return () => {
      view.destroy(); 
    };
  }, []);
  return <div ref={edContainer} className="container"></div>;
}

export default CvCodeEditor;