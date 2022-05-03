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

// TODO: もうちょっとMUIを生かした作りにしたい
const FaqItem: React.FC<Props> = ({ faq, index, removeQuestionAndAnswer }) => {
  // Answerは改行込みのデータを表示させる
  // 参考: https://qiita.com/ossan-engineer/items/bdb45368ab453af38342
  const style: React.CSSProperties = { whiteSpace: 'pre-line' };

  return (
    <Card sx={{ minWidth: 275, my: 2 }}>
      <CardContent sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => removeQuestionAndAnswer(index)}
          sx={{ position: 'absolute', top: '6px', right: '6px' }}
        >
          <CloseIcon color="error" />
        </IconButton>
        <Typography color="text.secondary" gutterBottom>
          <h3 style={{ fontWeight: 'bold', margin: 0 }}>Question</h3>
          <p style={{ margin: 0 }}>{faq.name}</p>
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          <h3 style={{ fontWeight: 'bold', margin: 0 }}>Answer</h3>
          <p style={{ ...style, ...{ margin: 0 } }}>{faq.acceptedAnswer.text}</p>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FaqItem;
