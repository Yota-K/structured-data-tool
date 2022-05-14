import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor as WysiwygEditor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// forwardRefを使って表示しないとエラーになった
// エラーになった原因はDOMの参照が必要だから？
// https://mui.com/material-ui/guides/composition/#caveat-with-refs
const Editor = React.forwardRef(() => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (value: EditorState) => {
    setEditorState(value);
  };

  // draft.jsで入力したHTMLを文字列に変換する
  const rawContentState = convertToRaw(editorState.getCurrentContent());
  const inputValue = convertToRaw(editorState.getCurrentContent()).blocks[0].text;

  const editorStyle: React.CSSProperties = {
    maxWidth: '600px',
    background: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translateX(-50%)',
  };

  return (
    <div style={editorStyle}>
      <WysiwygEditor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        localization={{ locale: 'ja' }}
      />
    </div>
  );
});

export default Editor;
