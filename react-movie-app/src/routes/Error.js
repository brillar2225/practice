import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);

  function handleBackHome() {
    navigate('/');
  }

  return (
    <div id='error-page'>
      <h1>THIS PAGE DOES NOT EXIST.</h1>
      <h2>Sorry, Please try again.</h2>
      <button onClick={handleBackHome}>Go Home</button>
    </div>
  );
}

export default Error;
