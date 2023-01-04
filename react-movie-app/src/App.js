// Way 1
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Error from './routes/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: 'movies/:id',
    element: <ValidateIds />,
    errorElement: <Error />,
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

// Way 2
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home />} errorElement={<Error />} />
//         <Route
//           path='/movies/:id'
//           element={<Detail />}
//           errorElement={<Error />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
