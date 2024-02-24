import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProductCategories, deleteProductCategory, resetState } from '../../features/products/ProductCategorySlice';

import CustomModal from '../../components/CustomModal/CustomModal';

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

const ProductCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [productCategoryId, setProductCategoryId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const showModal = (e) => {
    setOpen(true);
    setProductCategoryId(e);
  }

  const hideModal = () => { setOpen(false); }

  const productCategoriesState = useSelector((state) => state.productCategory.productCategories);
  // console.log(productCategoriesState);
  const { deletedProductCategory } = useSelector((state) => state.productCategory);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategories());
  }, [deletedProductCategory]);

  const data1 = [];

  for (let i = 0; i < productCategoriesState?.length; i++) {
    data1.push({
      key: i + 1,
      title: productCategoriesState[i].title,
      actions: (
        <>
          <Link
            to={`/admin/category/${productCategoriesState[i]?._id}`}
            className='fs-3 text-secondary'
          >
            <BiEdit />
          </Link>

          <button
            className='fs-3 ms-3 text-danger bg-transparent border-0'
            onClick={ () => showModal(productCategoriesState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const removeProductCategory = (currentProductCategory) => {
    // TODO: delete the product category with id
    dispatch(deleteProductCategory(currentProductCategory));
    setOpen(false);

    setTimeout(() => {
      dispatch(getProductCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mt-4 title">Product Category List</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { removeProductCategory(productCategoryId); }}
        title="Are you sure you want to delete this product category?"
      />
    </div>
  )
}

export default ProductCategoryList;