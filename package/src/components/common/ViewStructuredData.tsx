import React from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ActionIcon, Box, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { CircleCheck, Copy } from 'tabler-icons-react';
import { copyToClipBoard } from '~/utils/copyToClipBoard';
import { FaqPageStructuredData } from '~/types/structuredData';

type Props = {
  structuredData: FaqPageStructuredData;
};

const ViewStructuredData = React.memo<Props>(({ structuredData }) => {
  const structuredDataCopy = () => {
    copyToClipBoard(JSON.stringify(structuredData, null, 2));

    showNotification({
      title: 'クリップボードにコピーしました！',
      message: '',
      color: 'teal',
      icon: <CircleCheck />,
    });
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip label="コピー" withArrow sx={{ position: 'absolute', top: '4px', right: '4px', zIndex: 100000 }}>
        <ActionIcon
          color="indigo"
          size="lg"
          radius="xl"
          variant="transparent"
          style={{ color: '#fff' }}
          onClick={structuredDataCopy}
        >
          <Copy />
        </ActionIcon>
      </Tooltip>
      <CodeEditor
        value={JSON.stringify(structuredData, null, 2)}
        language="json"
        padding={15}
        style={{
          fontSize: 14,
          backgroundColor: '#323639',
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          borderRadius: '4px',
        }}
      />
    </Box>
  );
});

export default ViewStructuredData;
