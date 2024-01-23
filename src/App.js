import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Login from './pages/Auth/Login';
import ResetPassword from './pages/Auth/ResetPassword';
import ForgotPassword from './pages/Auth/ForgotPassword';
import MainLayout from './components/MainLayout/MainLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Enquiries from './pages/Enquiries/Enquiries';
import BlogList from './pages/Blog/BlogList';
import BlogCategoryList from './pages/Blog/BlogCategoryList';
import Orders from './pages/Orders/Orders';
import Customers from './pages/Customers/Customers';
import ColorList from './pages/Color/ColorList';
import ProductCategoryList from './pages/Product/ProductCategoryList';
import BrandList from './pages/Brand/BrandList';
import ProductList from './pages/Product/ProductList';
import AddBlog from './pages/Blog/AddBlog';
import AddBlogCategory from './pages/Blog/AddBlogCategory';
import AddColor from './pages/Color/AddColor';
import AddProductCategory from './pages/Product/AddProductCategory';
import AddProductBrand from './pages/Brand/AddProductBrand';
import AddProduct from './pages/Product/AddProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/admin' element={ <MainLayout /> } >
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category-list' element={<BlogCategoryList />} />
          <Route path='orders' element={<Orders />} />
          <Route path='customers' element={<Customers />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='category-list' element={<ProductCategoryList />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='add-blog-category' element={<AddBlogCategory />} />
          <Route path='color' element={<AddColor />} />
          <Route path='category' element={<AddProductCategory />} />
          <Route path='brand' element={<AddProductBrand />} />
          <Route path='add-product' element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;