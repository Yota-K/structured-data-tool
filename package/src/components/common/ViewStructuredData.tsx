import React, { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Tooltip from '@mui/material/Tooltip';
import { copyToClipBoard } from '~/utils/copyToClipBoard';
import Snackbar from '@mui/material/Snackbar';
import Alert from '~/components/common/Alert';
import { FaqPageStructuredData } from '~/types/structuredData';

type Props = {
  json: FaqPageStructuredData;
};

const ViewStructuredData: React.FC<Props> = ({ json }) => {
  const [open, setOpen] = useState(false);

  const structuredDataCopy = () => {
    copyToClipBoard(JSON.stringify(json, null, 2));
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title="コピー" placement="top" sx={{ position: 'absolute', top: 0, right: 0, zIndex: 100000 }}>
        <IconButton onClick={structuredDataCopy}>
          <CopyAllIcon sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <CodeEditor
        value={JSON.stringify(json, null, 2)}
        language="json"
        padding={15}
        style={{
          fontSize: 14,
          backgroundColor: '#323639',
          fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          borderRadius: '4px',
        }}
      />
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          コピーしました
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ViewStructuredData;
