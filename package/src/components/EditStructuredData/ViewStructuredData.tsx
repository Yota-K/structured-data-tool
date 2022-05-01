import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { FaqPageStructuredData } from '~/types/structuredData';

type Props = {
  json: FaqPageStructuredData;
};

const ViewStructuredData: React.FC<Props> = ({ json }) => {
  return (
    <>
      <CodeEditor
        value={JSON.stringify(json, null, 2)}
        language="json"
        padding={15}
        style={{
          fontSize: 14,
          backgroundColor: '#323639',
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </>
  );
};

export default ViewStructuredData;
