import React from 'react';
import { Button, Grid, Group, ScrollArea, TextInput, Title } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import ViewStructuredData from '~/components/common/ViewStructuredData';
import FaqItem from '~/components/EditStructuredData/FaqItem';
import { defaultfaqPageStructuredData } from '~/config/defaultStructuredData';
import { useFaq } from '~/hooks/useFaq';

const EditFaqstructuredData: React.FC = () => {
  const {
    structuredData,
    setStructuredData,
    faqData,
    isDisabled,
    editorRef,
    handleInputChange,
    handleEditorChange,
    addFaq,
    removeFaq,
    newStructuredData,
  } = useFaq();

  return (
    <>
      <Title order={2}>FAQの構造化データを入力してください</Title>
      <Grid grow>
        <Grid.Col md={1} lg={2}>
          <div>
            <Title order={3}>質問</Title>
            <TextInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              value={faqData.question}
            />
          </div>
          <div>
            <Title order={3}>答え</Title>
            <RichTextEditor
              controls={[
                ['bold', 'link', 'underline', 'italic'],
                ['unorderedList', 'orderedList'],
                ['h1', 'h2', 'h3'],
              ]}
              ref={editorRef}
              value={faqData.answer}
              onChange={(value) => handleEditorChange(value)}
            />
          </div>
          <Group style={{ margin: '20px 0' }}>
            <Button onClick={addFaq} disabled={isDisabled}>
              質問を増やす
            </Button>
            <Button onClick={() => setStructuredData(defaultfaqPageStructuredData)}>リセット</Button>
          </Group>
          {structuredData.mainEntity.length !== 0 && (
            <ScrollArea style={{ height: 250 }}>
              {structuredData.mainEntity.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i} removeQuestionAndAnswer={removeFaq} />
              ))}
            </ScrollArea>
          )}
        </Grid.Col>
        <Grid.Col md={1} lg={2}>
          <ViewStructuredData structuredData={newStructuredData} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default EditFaqstructuredData;
