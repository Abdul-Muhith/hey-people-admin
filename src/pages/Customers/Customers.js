import { Table } from 'antd';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../features/customers/CustomerSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
];
// move to mottom LECTURE 06 api integration
// const data1 = [];

// for (let i = 1; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     status: `London, Park Lane no. ${i}`,
//   });
// }

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers])

  const customerState = useSelector((state) => state.customer.customers);
  // console.log(customerState);

  const data1 = [];

  for (let i = 0; i < customerState.length; i++) {
    const isAdmin = customerState[i]?.role.find((role) => role === 'admin');

    if (!isAdmin) {
      data1.push({
        key: i + 1,
        name: customerState[i].firstName + ' ' + customerState[i].lastName,
        email: customerState[i].email,
        mobile: customerState[i].mobile,
      });
    }
  };

  return (
    <div>
      <h3 className="mt-4 title">Customers</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>
    </div>
  )
}

export default Customers;