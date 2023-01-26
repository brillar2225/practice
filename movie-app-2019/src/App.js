import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import Root from './routes/Root';
import Home from './routes/Home';
import About from './routes/About';
import NotFound from './routes/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
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

  return regexId.test(id) ? <About id={id} /> : <NotFound />;
}

export default App;
