import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FaqPageStructuredData } from '~/types/structuredData';

type Props = {
  faq: FaqPageStructuredData['mainEntity'][0];
  index: number;
  removeQuestionAndAnswer: (index: number) => void;
};

const FaqItem: React.FC<Props> = ({ faq, index, removeQuestionAndAnswer }) => {
  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton onClick={() => removeQuestionAndAnswer(index)}>
            <CloseIcon color="error" />
          </IconButton>
        </Box>
        <Typography color="text.secondary" gutterBottom>
          <span style={{ fontWeight: 'bold' }}>Question: </span>
          {faq.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          <span style={{ fontWeight: 'bold' }}>Answer: </span>
          {faq.acceptedAnswer.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FaqItem;
