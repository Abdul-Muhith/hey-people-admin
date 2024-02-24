import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import { getOrders, login } from '../../features/auth/AuthSlice';
// TODO: CLASS 17 & 18
import { getOrders, getSingleOrderByOrderId, resetState } from '../../features/orders/OrdersSlice';
import { login } from '../../features/auth/AuthSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Rating',
    dataIndex: 'total_rating',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

// const data1 = [];

// for (let i = 1; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     status: `London, Park Lane no. ${i}`,
//   });
// }

const ViewOrders = () => {
  const [userProducts, setUserProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getOrderId = (location.pathname.split('/')[4]);
  console.log('getOrderId', getOrderId);

  // const orderState = useSelector((state) => state.auth?.orders);
  // console.log('orderState -> ', orderState);

    //TODO: এভাবে করলে প্রথম দুইবার ইরর দেখাচ্ছে ফলে আমরা যখন অন্য কোন পেইজ ব্রাউজ করে এখানে আসছি ডাটা লোড করতে পারছে না।
    // const { products } = useSelector((state) => state.order?.orderByUserId);

  // const { singleOrder } = useSelector((state) => state.order);
  // const products = singleOrder?.products;
  // console.log('orderByUserId -> ', orderByUserId);

  const singleOrder = useSelector((state) => state.order?.singleOrder);
  const products = singleOrder?.products;
  // console.log('singleOrder -> ', singleOrder);
  // console.log('singleOrder products -> ', products?.length);

  const data1 = [];

  // TODO: AFTER CLASS 17 & 18
  for (let i = 0; i < products?.length; i++) {
    data1.push({
      key: i + 1,
      product_name: products[0]?.product?.title,
      brand: products[0].product?.brand,
      category: products[0].product?.category,
      price: products[0].product?.price,
      total_rating: products[0].product?.totalRating,
      color: products[0].color,
      count: products[0].count,
      actions: (<>
        <Link to='/' className='fs-3 text-secondary'>
          <BiEdit />
        </Link>

        <Link to='/' className='fs-3 ms-3 text-danger'>
          <AiFillDelete />
        </Link>
      </>),
    });
  };

  // TODO: AFTER CLASS 17
  useEffect(() => {
    // TODO: view all orders by user id
    if (getOrderId !== undefined) {
      dispatch(resetState());
      dispatch(getSingleOrderByOrderId(getOrderId));
    } else {
      dispatch(resetState());
    }
  }, [getOrderId]);

  return (
    <div>
      <h3 className="mt-4 title">View Orders</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>
    </div>
  )
}

export default ViewOrders;