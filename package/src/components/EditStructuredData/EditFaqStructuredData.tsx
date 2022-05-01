import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ViewStructuredData from '~/components/EditStructuredData/ViewStructuredData';
import { defaultfaqPageStructuredData } from '~/config/defaultStructuredData';
import { copyToClipBoard } from '~/utils/copyToClipBoard';

const EditFaqstructuredData = () => {
  const [structuredData, setStructuredData] = useState(defaultfaqPageStructuredData);
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

  const resetStructuredData = () => setStructuredData(defaultfaqPageStructuredData);

  return (
    <>
      <h2>FAQ Page</h2>
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
      <Button variant="contained" onClick={resetStructuredData}>
        リセット
      </Button>
      <Button variant="contained" onClick={() => copyToClipBoard(JSON.stringify(structuredData, null, 2))}>
        コピー
      </Button>
      <h2>構造化データ</h2>
      <ViewStructuredData json={structuredData} />
    </>
  );
};

export default EditFaqstructuredData;
