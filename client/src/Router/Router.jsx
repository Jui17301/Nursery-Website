import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage";
import Main from "../layouts/Main";;
import  CategoryList  from "../pages/CategoryList";
import { ProductList } from "../pages/ProductList";
import ProductDetails from "../pages/ProductDetails";
import Reviews from "../pages/Reviews";
import Home from "../pages/Home";

export const Router = createBrowserRouter([
  {
    path: '/',
  element: <Main />,
  errorElement: <ErrorPage />,
  children: [
    {
     path:'/',
     element:<Home/>
    },
    // {
      // path: '/categoryList',
      // index:true,
      // element:<CategoryList />,
    // },
    {      
      path:'/category/:category',
      element:<ProductList/>
    },
    {
      path:'/product/:id',
      element:<ProductDetails/>
    },
    // {
    //   path:'reviews',
    //   element:<Reviews/>
    // }
  ]
}
]);