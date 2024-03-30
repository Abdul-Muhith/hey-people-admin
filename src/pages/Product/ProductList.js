import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../../features/products/ProductSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
    sorter: (a, b) => a.color.length - b.color.length,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
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

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product?.products);
  // console.log(productState);

  const data1 = [];

  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      description: productState[i].description,
      color: productState[i].color,
      price: `${productState[i].price}`,
      action: (
        <>
          <Link
            to={ `/admin/update-product/${productState[i]?._id}` }
            className='fs-3 text-secondary'
          >
            <BiEdit />
          </Link>

          <Link to='/' className='fs-3 ms-3 text-danger'>
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mt-4 title">Product List</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>
    </div>
  )
}

export default ProductList;