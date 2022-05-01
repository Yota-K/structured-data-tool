import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FaqPageStructuredData } from '~/types/structuredData';

type Props = {
  faq: FaqPageStructuredData['mainEntity'][0];
};

const FaqItem: React.FC<Props> = ({ faq }) => {
  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <CardContent>
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
