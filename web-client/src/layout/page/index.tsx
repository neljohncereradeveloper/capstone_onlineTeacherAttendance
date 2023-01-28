import React from 'react';

interface Props {
  children: React.ReactNode;
}

const PageLayout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default PageLayout;
