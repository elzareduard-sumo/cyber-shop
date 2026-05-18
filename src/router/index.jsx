import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout.jsx';
import { ErrorPage } from '../pages/ErrorPage.jsx';
import { Home } from '../pages/Home.jsx';
import { Products, productsLoader } from '../pages/Products.jsx';
import { Cart } from '../pages/Cart.jsx';
import { News, newsLoader } from '../pages/News.jsx';
import { NewsDetail, newsDetailLoader } from '../pages/NewsDetail.jsx';
import { Catalog } from '../pages/Catalog.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'advanced-catalog',
        element: <Catalog />,
      },
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
      {
        path: 'news',
        element: <News />,
        loader: newsLoader,
      },
      {
        path: 'news/:id',
        element: <NewsDetail />,
        loader: newsDetailLoader,
      },
    ],
  },
]);
