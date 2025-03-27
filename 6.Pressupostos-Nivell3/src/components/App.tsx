import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Welcome from "./Welcome";
import Layout from './Layout';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome />} />
        <Route path="/calculator" element={<Layout />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;