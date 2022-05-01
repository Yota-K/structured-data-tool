import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FaqPageStructuredData } from '~/types/structuredData';
import Button from '@mui/material/Button';

type Props = {
  faq: FaqPageStructuredData['mainEntity'][0];
  index: number;
  removeQuestionAndAnswer: (index: number) => void;
};

const FaqItem: React.FC<Props> = ({ faq, index, removeQuestionAndAnswer }) => {
  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <CardContent>
        <Button onClick={() => removeQuestionAndAnswer(index)}>削除</Button>
        <Typography color="text.secondary" gutterBottom>
          Question: {faq.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Answer: {faq.acceptedAnswer.text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FaqItem;
