import React from 'react';
import { Title, TitleOrder } from '@mantine/core';

type Props = {
  children: React.ReactNode;
  order: TitleOrder;
};

// Titleのラッパーコンポーネント
const Heading: React.FC<Props> = ({ children, order }) => {
  const style = (order: TitleOrder): React.CSSProperties => {
    if (order === 2) {
      return {
        fontSize: '18px',
      };
    } else {
      return {
        fontSize: '16px',
      };
    }
  };

  return (
    <Title order={order} style={style(order)}>
      {children}
    </Title>
  );
};

export default Heading;
