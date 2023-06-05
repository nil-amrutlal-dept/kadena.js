// eslint-disable-next-line simple-import-sort/imports
import React, { FC } from 'react';
import AceEditor from 'react-ace';

// eslint-disable-next
import 'ace-builds/src-noconflict/mode-clojure';
// eslint-disable-next
import 'ace-builds/src-noconflict/mode-lisp';
// eslint-disable-next
import 'ace-builds/src-noconflict/theme-monokai';
// eslint-disable-next
import 'ace-builds/src-noconflict/theme-one_dark';

export interface AceEditorProps {
  code?: string;
}

const AceViewerComponent: FC<AceEditorProps> = ({ code }) => {
  return (
    <AceEditor
      mode="clojure"
      theme="one_dark"
      name="ace-editor"
      value={code}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
      width="94%"
      style={{ margin: '0 auto' }}
      fontSize={14}
      showPrintMargin={false}
      readOnly={true}
      height="40rem"
    />
  );
};

export default AceViewerComponent;
