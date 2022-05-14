import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function Editor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (value: EditorState) => {
    setEditorState(value);
  };
  return (
    <div>
      <WysiwygEditor editorState={editorState} onEditorStateChange={onEditorStateChange} />
    </div>
  );
}
