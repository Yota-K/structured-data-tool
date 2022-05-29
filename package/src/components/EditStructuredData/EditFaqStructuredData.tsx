import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import { Button, Grid, Group, ScrollArea, TextInput, Title } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import ViewStructuredData from '~/components/common/ViewStructuredData';
import FaqItem from '~/components/EditStructuredData/FaqItem';
import { defaultfaqPageStructuredData } from '~/config/defaultStructuredData';
import { FaqPageStructuredData } from '~/types/structuredData';
import { escapeHtml } from '~/utils/escapeHtml';

const EditFaqstructuredData: React.FC = () => {
  const [structuredData, setStructuredData] = useState<FaqPageStructuredData>(defaultfaqPageStructuredData);
  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
  });
  const [isDisabled, setIsDisabed] = useState(true);

  const editorRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    // 答えを入力するテキストエディタの初期値が '<p><br></p>' になっている
    if (faqData.question !== '' && faqData.answer !== '<p><br></p>') {
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

  const handleEditorChange = (answer: string) => {
    setFaqData({
      ...faqData,
      answer,
    });
  };

  // FAQを追加
  const addFaq = () => {
    setStructuredData({
      ...structuredData,
      mainEntity: [
        ...structuredData.mainEntity,
        {
          '@type': 'Question',
          name: faqData.question.trim(),
          acceptedAnswer: {
            '@type': 'Answer',
            text: faqData.answer.trim().replace(/\r?\n/g, ''),
          },
        },
      ],
    });

    // RichTextEditorの中身はDOMに直接アクセスしないと削除できなかったのでRefを使用する
    if (!editorRef.current) return;

    const editorHtml = editorRef.current.editingArea as Element;
    if (editorHtml) {
      const qlEditor = editorHtml.querySelector('.ql-editor');
      if (qlEditor) qlEditor.innerHTML = '';
    }
    editorRef.current.value = '';

    setFaqData({
      question: '',
      answer: '',
    });
  };

  // FAQを削除
  const removeFaq = (index: number) => {
    const newStructuredData = [...structuredData.mainEntity].filter((_faq, faqIndex) => faqIndex !== index);
    setStructuredData({
      ...structuredData,
      mainEntity: newStructuredData,
    });
  };

  // FAQの構造化データの中の答えのHTMLのエスケープ化を行う
  const escapeAnswerHtml = structuredData.mainEntity.map((entity) => {
    return {
      ...entity,
      acceptedAnswer: {
        '@type': 'Answer',
        text: escapeHtml(entity.acceptedAnswer.text),
      },
    };
  });

  // プレビューに表示する構造化データの答えのみ上書きする
  const newStructuredData = { ...structuredData, mainEntity: escapeAnswerHtml } as FaqPageStructuredData;

  return (
    <>
      <Title order={2}>FAQの構造化データを入力してください</Title>
      <Grid grow>
        <Grid.Col md={1} lg={2}>
          <Title order={3}>質問</Title>
          <TextInput
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
            value={faqData.question}
          />
          <Title order={3}>答え</Title>
          <RichTextEditor ref={editorRef} value={faqData.answer} onChange={(value) => handleEditorChange(value)} />
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
