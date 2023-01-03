// Way 1
// import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//     errorElement: <Error />,
//   },
//   {
//     path: 'detail',
//     element: <Detail />,
//     errorElement: <Error />,
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// Way 2
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Error from './routes/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} errorElement={<Error />} />
        <Route
          path='movies/:id'
          element={<Detail />}
          errorElement={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
