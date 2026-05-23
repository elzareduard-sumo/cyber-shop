import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout.jsx';
import { ErrorPage } from '../pages/ErrorPage.jsx';
import { Home } from '../pages/Home.jsx';
import { Products, productsLoader } from '../pages/Products.jsx';
import { Cart } from '../pages/Cart.jsx';
import { News, newsLoader } from '../pages/News.jsx';
import { NewsDetail, newsDetailLoader } from '../pages/NewsDetail.jsx';
import { Catalog } from '../pages/Catalog.jsx';
import { ProductDetail } from '../pages/ProductDetail.jsx';
import { Login } from '../pages/Login.jsx';
import { Profile } from '../pages/Profile.jsx';
import { PrivateRoute } from '../components/PrivateRoute.jsx';

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
        path: 'advanced-catalog/:id',
        element: <ProductDetail />,
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
      { path: 'login', element: <Login /> },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);
