import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ViewStructuredData from '~/components/EditStructuredData/ViewStructuredData';
import FaqItem from '~/components/EditStructuredData/FaqItem';
import { defaultfaqPageStructuredData } from '~/config/defaultStructuredData';
import { copyToClipBoard } from '~/utils/copyToClipBoard';
import { FaqPageStructuredData } from '~/types/structuredData';

const EditFaqstructuredData = () => {
  const [structuredData, setStructuredData] = useState<FaqPageStructuredData>(defaultfaqPageStructuredData);
  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
  });

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
          name: faqData.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faqData.answer,
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
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <div>
            <TextField
              id="outlined-basic"
              label="質問"
              variant="outlined"
              margin="normal"
              value={faqData.question}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="答え"
              variant="outlined"
              multiline={true}
              margin="normal"
              value={faqData.answer}
              onChange={handleTextareaChange}
            />
          </div>
          <Button variant="contained" onClick={addQuestionAndAnswer}>
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
          <ViewStructuredData json={structuredData} />
          <Button
            sx={{ my: 2 }}
            variant="contained"
            onClick={() => copyToClipBoard(JSON.stringify(structuredData, null, 2))}
          >
            コピー
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default EditFaqstructuredData;
