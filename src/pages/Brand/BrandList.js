import { Table } from 'antd';

import { BiEdit, BiRadar } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { getBrands, deleteBrand, resetState } from '../../features/brands/BrandSlice';

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

const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  }

  const hideModal = () => { setOpen(false); }

  const brandState = useSelector((state) => state.brand?.brands);
  // console.log(brandState);
  const { deletedBrand } = useSelector((state) => state.brand);

  const data1 = [];

  for (let i = 0; i < brandState?.length; i++) {
    data1.push({
      key: i + 1,
      title: brandState[i].title,
      actions: (
        <>
          <Link
            to={`/admin/brand/${brandState[i]?._id}`}
            className='fs-3 text-secondary'
          >
            <BiEdit />
          </Link>

          {/*<Link to='/' className='fs-3 ms-3 text-danger'>
            <AiFillDelete />
          </Link>*/}

          <button
            className='fs-3 ms-3 text-danger bg-transparent border-0'
            onClick={()  => showModal(brandState[i]._id)}
            >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  };

  const removeBrand = (currentBrand) => {
    // TODO: delete the brand with id
    dispatch(deleteBrand(currentBrand));
    setOpen(false);

    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [deletedBrand]);

  return (
    <div>
      <h3 className="mt-4 title">Brands Lists</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { removeBrand(brandId); }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  )
}

export default BrandList;