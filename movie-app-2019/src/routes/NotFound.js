import { useNavigate, useRouteError } from 'react-router-dom';
import style from './NotFound.module.css';

function NotFound() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);

  function handleBackHome() {
    navigate('/');
  }

  return (
    <div className={style.notFound}>
      <div className={style.notFound__container}>
        <div className={style.notFound__notice}>
          <h1 className={style.notFound__title}>THIS PAGE DOES NOT EXIST.</h1>
          <h2 className={style.notFound__desc}>Sorry, Please try again.</h2>
        </div>
        <button className={style.notFound__btn} onClick={handleBackHome}>
          Go Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
