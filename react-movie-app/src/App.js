// Way 1
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import Root from './routes/Root';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Error from './routes/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movies/:id', element: <ValidateIds /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

function ValidateIds() {
  const regexId = /\b\d{5}\b/g;
  const { id } = useParams();

  return regexId.test(id) ? <Detail /> : <Error />;
}

export default App;
