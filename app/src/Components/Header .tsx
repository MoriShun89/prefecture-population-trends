import React from 'react';
import '../Style/Header.css';

type PropsType = {
  pageTitle: string
}

/**
 * ページのヘッダーを作成するコンポーネント
 */
const Header = (props: PropsType) => {
  const {pageTitle} = props;
  
  return(
    <>
      <header>
        <h1 className="title">{pageTitle}</h1>
      </header>
    </>
  );
}

export default Header;
