import { useNavigate, useRouteError } from 'react-router-dom';
import style from './Error.module.css';

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);

  function handleBackHome() {
    navigate('/');
  }

  return (
    <div className={style.error}>
      <div className={style.error__container}>
        <div className={style.error__notice}>
          <h1 className={style.error__title}>THIS PAGE DOES NOT EXIST.</h1>
          <h2 className={style.error__desc}>Sorry, Please try again.</h2>
        </div>
        <button className={style.error__btn} onClick={handleBackHome}>
          Go Home
        </button>
      </div>
    </div>
  );
}

export default Error;
