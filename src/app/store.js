import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/AuthSlice';
import customerReducer from '../features/customers/CustomerSlice';
import productReducer from '../features/products/ProductSlice';
import brandReducer from '../features/brands/BrandSlice';
import productCategoryReducer from '../features/products/ProductCategorySlice';
import blogReducer from '../features/blogs/BlogSlice';
import blogCategoryReducer from '../features/blogs/BlogCategorySlice';
import colorReducer from '../features/color/ColorSlice';
import enquiriesReducer from '../features/enquiries/EnquiriesSlice';
import uploadReducer from '../features/upload/UploadSlice';
import couponReducer from '../features/coupon/CouponSlice';
import orderReducer from '../features/orders/OrdersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: productCategoryReducer,
    // TODO: color reducer is created here on class 6
    color: colorReducer,
    blogs: blogReducer,
    blogCategory: blogCategoryReducer,
    enquiry: enquiriesReducer,
    upload: uploadReducer,
    coupon: couponReducer,
    // TODO: not he but I create this order reducer here on class 17
    order: orderReducer,
  },
});



//  ACCORDING TO MEMORIES PROJECT

// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import { thunk } from 'redux-thunk'

// import reducers from '../reducers';

// export const store = createStore(reducers, applyMiddleware(thunk));