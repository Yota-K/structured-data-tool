import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (value: EditorState) => {
    setEditorState(value);
  };

  // draft.jsで入力したHTMLを文字列に変換する
  const rawContentState = convertToRaw(editorState.getCurrentContent());

  return (
    <div>
      <WysiwygEditor editorState={editorState} onEditorStateChange={onEditorStateChange} />
      {draftToHtml(rawContentState)}
    </div>
  );
};
export default Editor;
