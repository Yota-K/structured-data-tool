import React from 'react';
import { CloseButton, Paper, Text, Title } from '@mantine/core';
import { FaqPageStructuredData } from '~/types/structuredData';

type Props = {
  faq: FaqPageStructuredData['mainEntity'][0];
  index: number;
  removeQuestionAndAnswer: (index: number) => void;
};

// TODO: Answerは改行込みのデータを表示させる
// 参考: https://qiita.com/ossan-engineer/items/bdb45368ab453af38342
const FaqItem: React.FC<Props> = ({ faq, index, removeQuestionAndAnswer }) => {
  return (
    <Paper shadow="xs" p="sm" style={{ margin: '20px 0', position: 'relative' }}>
      <CloseButton
        onClick={() => removeQuestionAndAnswer(index)}
        style={{ position: 'absolute', top: '4px', right: '10px' }}
        color="red"
        radius="xl"
        aria-label="FAQを削除する"
      />
      <Title order={3}>Question</Title>
      <Text>{faq.name}</Text>
      <Title order={3}>Answer</Title>
      <Text>{faq.acceptedAnswer.text}</Text>
    </Paper>
  );
};

export default FaqItem;
