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
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const data1 = [];

for (let i = 1; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
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
    data,
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
        alias: 'Income',
      },
    },
  };

  return (
    <div>
      <h3 className='mb-4 title'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex justify-content-between align-items-end bg-white rounded-3 flex-grow-1 p-3'>
          <div>
            <p className="desc">Total</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className='green'><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compared to April 2024</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end bg-white rounded-3 flex-grow-1 p-3'>
          <div>
            <p className="desc">Total</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className="red"><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compared to April 2024</p>
          </div>
        </div>

        <div className='d-flex justify-content-between align-items-end bg-white rounded-3 flex-grow-1 p-3'>
          <div>
            <p className="desc">Total</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>

          <div className='d-flex flex-column align-items-end'>
            <h6 className="green"><BsArrowDownRight /> 32%</h6>
            <p className='mb-0 desc'>Compared to April 2024</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4 flex-grow-1">
          <h3 className='mb-5 title'>Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className="mt-4 flex-grow-1">
          <h3 className="mb-5 title">Recent Orders</h3>
          <div>
            <Table
              columns={ columns }
              dataSource={ data1 }
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;