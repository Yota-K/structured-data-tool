import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AppModal from '~/components/common/AppModal';
import Editor from '~/components/common/Editor';
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <h2>FAQ Page</h2>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <div>
            <Button variant="contained" onClick={handleOpen}>
              質問を入力する
            </Button>
            <Button sx={{ m: 2 }} variant="contained">
              答えを入力する
            </Button>
          </div>
          <AppModal open={open} onClose={handleClose}>
            <Editor />
          </AppModal>

          <Button variant="contained" onClick={addQuestionAndAnswer} disabled={isDisabled}>
            質問を増やす
          </Button>
          <Button sx={{ m: 2 }} variant="contained" onClick={resetStructuredData}>
            リセット
          </Button>
          {structuredData.mainEntity.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} removeQuestionAndAnswer={removeQuestionAndAnswer} />
          ))}
        </Grid>
        <Grid item xs={8}>
          <ViewStructuredData jsonString={structuredData} />
        </Grid>
      </Grid>
    </>
  );
};

export default EditFaqstructuredData;
