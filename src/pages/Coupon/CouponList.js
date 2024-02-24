import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { changeDateFomat } from '../../utils/dateFomat';

import { getCoupons, deleteCoupon, resetState } from '../../features/coupon/CouponSlice';

import CustomModal from '../../components/CustomModal/CustomModal';

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
    title: 'Expiry Date',
    dataIndex: 'expiryDate',
    sorter: (a, b) => a.expiryDate.length - b.expiryDate.length,
  },
  {
    title: 'Discount ( % )',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount.length - b.discount.length,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  }

  const hideModal = () => { setOpen(false); }

  const couponState = useSelector((state) => state.coupon?.coupons);
  // console.log(couponState);
  const { deletedCoupon } = useSelector((state) => state.coupon);

  const data1 = [];

  for (let i = 0; i < couponState?.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      expiryDate: changeDateFomat(couponState[i].expiry),
      discount: couponState[i].discount,
      actions: (
        <>
          <Link
            to={`/admin/update-coupon/${couponState[i]?._id}`}
            className='fs-3 text-secondary'
          >
            <BiEdit />
          </Link>

          {/*<Link to='/' className='fs-3 ms-3 text-danger'>
            <AiFillDelete />
          </Link>*/}

          <button
            className='fs-3 ms-3 text-danger bg-transparent border-0'
            onClick={()  => showModal(couponState[i]._id)}
            >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const removeCoupon = (e) => {
    // TODO: delete the coupon with id
    // console.log(e);
    dispatch(deleteCoupon(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, [deletedCoupon]);

  return (
    <div>
      <h3 className="mt-4 title">Coupon Lists</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { removeCoupon(couponId); }}
        title="Are you sure you want to delete this coupon?"
      />
    </div>
  )
}

export default CouponList;