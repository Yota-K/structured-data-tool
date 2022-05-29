import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import { defaultfaqPageStructuredData } from '~/config/defaultStructuredData';
import { FaqPageStructuredData } from '~/types/structuredData';
import { escapeHtml } from '~/utils/escapeHtml';

export const useFaq = () => {
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
            text: faqData.answer,
          },
        },
      ],
    });

    // RichTextEditorの中身はDOMに直接アクセスしないと削除できなかったのでRefを使用する
    if (!editorRef.current) return;

    const editorHtml = editorRef.current.editingArea as Element;

    if (editorHtml) {
      const qlEditor = editorHtml.querySelector('.ql-editor');

      // エディターに入力した答えの初期化
      if (qlEditor) qlEditor.innerHTML = '';
    }

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

  return {
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
  };
};
