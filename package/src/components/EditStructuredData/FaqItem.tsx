import React from 'react';
import { CloseButton, Paper, Text } from '@mantine/core';
import Heading from '~/components/common/Heading';
import { FaqPageStructuredData } from '~/types/structuredData';

type Props = {
  faq: FaqPageStructuredData['mainEntity'][0];
  index: number;
  removeQuestionAndAnswer: (index: number) => void;
};

const FaqItem: React.FC<Props> = ({ faq, index, removeQuestionAndAnswer }) => {
  return (
    <Paper shadow="xs" p="sm" style={{ margin: '20px 0', position: 'relative' }}>
      <CloseButton
        onClick={() => removeQuestionAndAnswer(index)}
        style={{ position: 'absolute', top: '8px', right: '18px' }}
        color="red"
        radius="xl"
        aria-label="FAQを削除する"
      />
      <Heading order={3}>Question</Heading>
      <Text>{faq.name}</Text>
      <Heading order={3}>Answer</Heading>
      <Text dangerouslySetInnerHTML={{ __html: faq.acceptedAnswer.text }} />
    </Paper>
  );
};

export default FaqItem;
