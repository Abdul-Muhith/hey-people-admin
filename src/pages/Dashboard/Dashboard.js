import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../features/auth/AuthSlice';
import { getAllOrders, getMonthlyUserOrders, getYearlyUserOrders, resetState } from '../../features/orders/OrdersSlice';

import { BsArrowDownLeft, BsArrowDownRight } from "react-icons/bs";

import { Column } from '@ant-design/plots';

import { Table } from 'antd';

import './Dashboard.css';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Customers Name',
    dataIndex: 'customersname',
  },
  {
    title: 'Product Count',
    dataIndex: 'productcount',
  },
  {
    title: 'Total Price',
    dataIndex: 'totalprice',
  },
  {
    title: 'Total After Discount',
    dataIndex: 'totalafterdiscount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

//TODO: AFTER CLASS 18
// const data1 = [];

// for (let i = 1; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     status: `London, Park Lane no. ${i}`,
//   });
// }

const Dashboard = () => {
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [dataYearly, setDataYearly] = useState([]);
  const [singleUserOrdersData, setSingleUserOrdersData] = useState([]);

  const dispatch = useDispatch();
  const { monthlyUserOrders } = useSelector((state) => state.order);
  const yearlyUserOrders = useSelector((state) => state.order?.yearlyUserOrders);
  const singleUserOrdersState = useSelector((state) => state?.order?.orders);

  // const monthlyOrderState = monthlyUserOrders;
  // console.log('yearlyUserOrders', yearlyUserOrders);
  // console.log('singleUserOrdersState', singleUserOrdersState);

  //TODO: যদি ব্যাকএন্ড থেকে অপজেক্ট আকারে ডাটা পাঠানো হয়, তাহলে এটা দরকার পড়বে।
  // const { allOrders } = singleUserOrdersState;
  // console.log('allOrders', allOrders);

  useEffect(() => {
    dispatch(resetState());
    dispatch(login());
    dispatch(getMonthlyUserOrders());
    dispatch(getYearlyUserOrders());
    dispatch(getAllOrders());
  }, [getMonthlyUserOrders, getYearlyUserOrders, getAllOrders, login]);

  useEffect(() => {
    if (monthlyUserOrders) {
      let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      let data = [];
      let monthlyOrderCount = [];

      for (let i = 0; i < monthlyUserOrders.length; i++) {
        const element = monthlyUserOrders[i];

        data.push({
          type: monthNames[element?._id?.month],
          Income: element?.amount
          // sales: element?.count
        });

        monthlyOrderCount.push({
          type: monthNames[element?._id?.month],
          sales: element?.count
          // sales: element?.count
        });
      };

      setDataMonthly(data);
      setDataMonthlySales(monthlyOrderCount);
    }
  }, [monthlyUserOrders]);

  useEffect(() => {
    if (yearlyUserOrders !== undefined) {
      setDataYearly(yearlyUserOrders[0]);
    }
  }, [yearlyUserOrders]);

  useEffect(() => {
    if (singleUserOrdersState !== undefined && singleUserOrdersState.length > 0) {
      // console.log('before -> ', singleUserOrdersData);
      // console.log('hey -> ', singleUserOrdersState);
      setSingleUserOrdersData(singleUserOrdersState);
      // console.log('after -> ', singleUserOrdersData);
    }
  }, [singleUserOrdersState]);

  // console.log('singleUserOrdersData -> ', singleUserOrdersData);

  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 52,
    },
    {
      type: 'March',
      sales: 61,
    },
    {
      type: 'April',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'June',
      sales: 38,
    },
    {
      type: 'July',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sep',
      sales: 38,
    },
    {
      type: 'Oct',
      sales: 38,
    },
    {
      type: 'Nov',
      sales: 38,
    },
    {
      type: 'Dec',
      sales: 38,
    },
  ];

  const config = {
    data: dataMonthly,
    xField: 'type',
    // yField: 'sales',
    // TODO: class 18
    yField: 'Income',
    color: ({ type }) => { return "#ffd333" },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };

  // TODO: class 18
  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => { return "#ffd333" },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };

  // singleUserOrdersState.map((order, i) => {
  //   console.log('Orders -> ', order);
  // });

  const data1 = [];

  for (let i = 1; i < singleUserOrdersData?.length; i++) {
    data1.push({
      key: i + 1,
      customersname: singleUserOrdersData[i].orderBy?.firstName + ' ' + singleUserOrdersData[i].orderBy?.lastName,
      productcount: singleUserOrdersData[i].products?.length,
      totalprice: singleUserOrdersData[i].totalPrice,
      totalafterdiscount: singleUserOrdersData[i].totalAfterDiscount,
      status: singleUserOrdersData[i].orderStatus,
    });
  }

  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3 flex-wrap'>
        <div className='d-flex justify-content-between align-items-end bg-white rounded-3 flex-grow-1 p-3'>
          <div>
            <p className="desc">Yearly Total Income</p>
            {/* AFTER CLASS 18 */}
            {/* <h4 className='mb-0 sub-title'>$1100</h4> */}
            <h4 className='mb-0 sub-title'>${dataYearly?.amount}</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Last Year from Today</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end bg-white rounded-3 flex-grow-1 p-3'>
          <div>
            <p className="desc">Yearly Total Sales</p>
            {/* <h4 className='mb-0 sub-title'>$1100</h4> */}
            <h4 className='mb-0 sub-title'>{dataYearly?.count}</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className="red"><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Last Year from Today</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end bg-white rounded-3 flex-grow-1 p-3'>
          <div>
            <p className="desc">Total</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className="green"><BsArrowDownRight /> 32% </h6>
            <p className='mb-0 desc'>Compared to April 2024</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1 w-50">
          <h3 className='mb-5 title'>Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className="mt-4 flex-grow-1 w-50">
          <h3 className='mb-5 title'>Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table
            columns={ columns }
            dataSource={ data1 }
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;