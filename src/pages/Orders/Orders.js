import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alignDateTimeFomat } from '../../utils/dateFomat';

// import { getOrders, login } from '../../features/auth/AuthSlice';
// TODO: CLASS 17
import { getAllOrders, updateSingleOrderStatusByOrderId, resetState } from '../../features/orders/OrdersSlice';
import { login } from '../../features/auth/AuthSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Total Amount',
    dataIndex: 'total_amount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
    {
    title: 'Date',
    dataIndex: 'date',
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

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllOrders());
  }, [getAllOrders, login]);

  // const orderState = useSelector((state) => state.auth?.orders);
  const orderState = useSelector((state) => state.order?.orders);
  // console.log('orderState -> ', orderState[0]?.orderStatus);
  // console.log('orderState id -> ', orderState[0]?._id);

  const handleOrderStatus = (value, orderId) => {
    const updatedData = {id: orderId, status: value}
    dispatch(updateSingleOrderStatusByOrderId(updatedData));
    console.log('value -> ', value);
    console.log('orderId -> ',orderId);
  };

  const data1 = [];

  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].orderBy.firstName + ' ' + orderState[i].orderBy.lastName,
      // TODO: AFTER CLASS 17
      // product: orderState[i].products.map((item, key) => {
      //   return (
      //     <ul key={key}>
      //       <li>{ item.product.title }</li>
      //     </ul>
      //   )
      // }),
      product: (
        <Link to={`/admin/orders/single-order/${orderState[i]?._id}`}>View User Orders</Link>
      ),
      total_amount: orderState[i].paymentIntent.amount,
      status: (<>
        <select
          id=""
          name=""
          className='form-control form-select'
          defaultValue={orderState[i].orderStatus ? orderState[i].orderStatus : "Processed"}
          onChange={(event) => handleOrderStatus(event.target.value, orderState[i]._id)}
        >
          <option value={ orderState[i].orderStatus ? orderState[i].orderStatus : "--Set Status--" }>
            { orderState[i].orderStatus ? orderState[i].orderStatus : "--Set Status--" }
          </option>
          <option value="Processed">Processed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out For Delivery">Out For Delivery</option>
          <option value="Resolved">Resolved</option>
        </select>
      </>),
      date: (
        <>
          <span>
            { alignDateTimeFomat(orderState[i].createdAt) }
          </span>

          <br />

          <span>
            { orderState[i].createdAt !== orderState[i].updatedAt
              ? alignDateTimeFomat(orderState[i].updatedAt)
              : "" }
          </span>
        </>
      ),
      actions: (
        <>
          <Link to='/' className='fs-3 text-secondary'>
            <BiEdit />
          </Link>

          <Link to='/' className='fs-3 ms-3 text-danger'>
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  };

  return (
    <div>
      <h3 className="mt-4 title">Orders</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>
    </div>
  )
}

export default Orders;