import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Button({ style, opacity, btnRef }) {
  return (
    <a
      href='#root'
      className={style.home__btn}
      style={{ opacity }}
      ref={btnRef}
    >
      <FontAwesomeIcon icon={faArrowUp} className={style.home__icon} />
    </a>
  );
}

export default Button;
