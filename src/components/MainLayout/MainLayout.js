import React, { useState } from 'react';

// AFTER CLASS 09
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate, Outlet, Link } from 'react-router-dom';

import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiOutlinePicRight,
  AiOutlinePicLeft,
  AiOutlineEye,
  AiOutlineLogout,
} from "react-icons/ai";

import { BiCategoryAlt } from "react-icons/bi";

import { FaClipboardList, FaBloggerB } from "react-icons/fa";

import { ImBlog } from "react-icons/im";

import { IoIosNotifications } from "react-icons/io";

import { SiBrandfolder } from "react-icons/si";

import { RiCouponLine } from "react-icons/ri";

import './MainLayout.css';

import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className='text-white text-center fs-5 py-3 mb-0'>
            <span className='sm-logo'>LOGO</span>
            <span className='lg-logo'>Hey People</span>
          </h2>
        </div>

        <Menu theme="dark" mode="inline"
          defaultSelectedKeys={ ['1'] }
          onClick={ ({ key }) => {
            // if (key === 'logout') {
            //TODO: LAST TIME OF CLASS 18
            if (key === 'signout') {
              localStorage.clear();
              window.location.reload();
              // navigate('/');
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'add-product',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Add Product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color-List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Marketing',
              children: [
                {
                  key: 'add-coupon',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Add-Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className='fs-4' />,
                  label: 'Coupon List',
                },
              ]
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'add-blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog List',
                },
                {
                  key: 'add-blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <AiOutlineEye className='fs-4' />,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <AiOutlineLogout  className='fs-4' />,
              label: 'Signout',
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={ { padding: 0, background: colorBgContainer, } }
          className='d-flex justify-content-between ps-1 pe-5'
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64, }}
          />

          <div className='d-flex align-items-center gap-4'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>

            <div
              className='d-flex align-items-center gap-3'
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div>
                <img
                  alt=''
                  src='https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg'
                  width={ 32 }
                  height={32}
                />
              </div>

              <div>
                <h5 className='mb-0'>Hey People</h5>
                <p className='mb-0'>hey.people@gmail.com</p>
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={ { height: "auto", lineHeight: "20px" } }
                    to="/">
                    View Profile
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={ { height: "auto", lineHeight: "20px" } }
                    to="/">
                    Signout
                  </Link>
                </li>
              </div>

            </div>
          </div>
        </Header>

        <Content
          style={ {
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          } }
        >
          <ToastContainer
            position="top-right"
            // autoClose={5000}
            autoClose={250}
            hideProgressBar={false}
            // newestOnTop={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            // pauseOnHover
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;