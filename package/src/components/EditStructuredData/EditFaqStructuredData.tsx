import React, { useState, useEffect } from 'react';
import { Button, Grid, Group, ScrollArea, Textarea, TextInput, Title } from '@mantine/core';
import ViewStructuredData from '~/components/common/ViewStructuredData';
import FaqItem from '~/components/EditStructuredData/FaqItem';
import { defaultfaqPageStructuredData } from '~/config/defaultStructuredData';
import { FaqPageStructuredData } from '~/types/structuredData';

const EditFaqstructuredData = () => {
  const [structuredData, setStructuredData] = useState<FaqPageStructuredData>(defaultfaqPageStructuredData);
  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
  });
  const [isDisabled, setIsDisabed] = useState(true);

  useEffect(() => {
    if ([faqData.question, faqData.answer].every((value) => value !== '')) {
      setIsDisabed(false);
      return;
    }

    setIsDisabed(true);
  }, [faqData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaqData({
      ...faqData,
      question: e.target.value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFaqData({
      ...faqData,
      answer: e.target.value,
    });
  };

  const addQuestionAndAnswer = () => {
    setStructuredData({
      ...structuredData,
      mainEntity: [
        ...structuredData.mainEntity,
        {
          '@type': 'Question',
          name: faqData.question.trim(),
          acceptedAnswer: {
            '@type': 'Answer',
            // 改行コードは削除する
            // TODO: 本当は以下のような感じにしたい
            // 追加したFAQ: 改行コード削除しない
            // 構造化データのプレビュー: 改行コード削除
            text: faqData.answer.trim().replace(/\r?\n/g, ''),
          },
        },
      ],
    });

    setFaqData({
      question: '',
      answer: '',
    });
  };

  const removeQuestionAndAnswer = (index: number) => {
    const newStructuredData = [...structuredData.mainEntity].filter((_faq, faqIndex) => faqIndex !== index);
    setStructuredData({
      ...structuredData,
      mainEntity: newStructuredData,
    });
  };

  const resetStructuredData = () => setStructuredData(defaultfaqPageStructuredData);

  return (
    <>
      <Title order={2}>FAQ Page</Title>
      <Grid grow>
        <Grid.Col md={1} lg={2}>
          <div>
            <TextInput
              label="質問"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              value={faqData.question}
            />
          </div>
          <div>
            <Textarea
              label="答え"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextareaChange(e)}
              minRows={5}
              value={faqData.answer}
            />
          </div>
          <Group style={{ marginTop: '20px' }}>
            <Button onClick={addQuestionAndAnswer} disabled={isDisabled}>
              質問を増やす
            </Button>
            <Button onClick={resetStructuredData}>リセット</Button>
          </Group>
          <ScrollArea style={{ height: 300 }}>
            {structuredData.mainEntity.map((faq, i) => (
              <FaqItem key={i} faq={faq} index={i} removeQuestionAndAnswer={removeQuestionAndAnswer} />
            ))}
          </ScrollArea>
        </Grid.Col>
        <Grid.Col md={1} lg={2}>
          <ViewStructuredData jsonString={structuredData} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default EditFaqstructuredData;
