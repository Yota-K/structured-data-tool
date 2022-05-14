import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ViewStructuredData from '~/components/common/ViewStructuredData';
import FaqItem from '~/components/EditStructuredData/FaqItem';
import Editor from '~/components/common/Editor';
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
      <h2>FAQ Page</h2>
      <Editor />
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <div>
            <TextField
              label="質問"
              variant="outlined"
              margin="normal"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
              fullWidth
              value={faqData.question}
              sx={{
                '& .MuiInputBase-input': {
                  /* WPの管理画面のスタイルとバッティングして表示崩れが発生してした */
                  /* ゆくゆくはMUIのテーマとかで設定した方が良さそう */
                  border: '0px !important',
                  padding: '16.5px 14px !important',
                },
              }}
            />
          </div>
          <div>
            <TextField
              label="答え"
              variant="outlined"
              margin="normal"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextareaChange(e)}
              fullWidth
              multiline
              minRows={5}
              value={faqData.answer}
              sx={{
                '& .MuiOutlinedInput-root': {
                  background: '#fff',
                },
                '& .MuiInputBase-inputMultiline': {
                  boxShadow: 'none',
                },
              }}
            />
          </div>
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
