import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout.jsx';
import { ErrorPage } from '../pages/ErrorPage.jsx';
import { Home } from '../pages/Home.jsx';
import { Products, productsLoader } from '../pages/Products.jsx';
import { Cart } from '../pages/Cart.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    errorElement: <ErrorPage />, 
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader, 
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);