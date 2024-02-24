import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { alignDateFomat } from '../../utils/dateFomat';

import CustomInput from '../../components/CustomInput/CustomInput';
import { createCoupon, getSingleCoupon, updateCoupon, resetState } from '../../features/coupon/CouponSlice';

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getCouponId = (location.pathname.split('/')[3]);

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess, isError, isLoading, createdCoupon, couponName, couponExpiry, couponDiscount, updatedCoupon } = newCoupon;

  let schema = Yup.object().shape({
    name: Yup.string().required("Coupon Name is Required"),
    expiry: Yup.date().required("Expiry Date is Required"),
    discount: Yup.number().required("Discount Percentage is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // name: '',
      // expiry: '',
      // discount: '',
      name: couponName || "",
      // expiry: changeDateFomat(couponExpiry) || "",
      expiry: alignDateFomat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateCoupon(data));
        dispatch(resetState());
      } else {
        console.log('hello -> ', values);
        dispatch(createCoupon(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/coupon-list');
        }, 300);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getSingleCoupon(getCouponId));
      // formik.values.name = couponName;
      // formik.values.expiry = couponExpiry;
      // formik.values.discount = couponDiscount;
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added successfully!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated successfully!");
      navigate('/admin/coupon-list')
    }
    if (isError) {
      toast.error("Something wrong with adding Coupon!");
    }
    // }, [isSuccess, isError, isLoading, createdCoupon])
  }, [isSuccess, isError, isLoading]);

  const nameError = formik.touched.name && formik.errors.name && (
    <div className='error'>
        {formik.errors.name}
    </div>
  )

  const expiryError = formik.touched.expiry && formik.errors.expiry && (
    <div className='error'>
        {formik.errors.expiry}
    </div>
  )

  const discountError = formik.touched.discount && formik.errors.discount && (
    <div className='error'>
        {formik.errors.discount}
    </div>
  )

  return (
    <div>
      <h3 className='mb-4 name'>
        { getCouponId !== undefined ? "Edit" : "Add" } Coupon
      </h3>
      <div className=''>
        <form onSubmit={formik.handleSubmit} >
          <CustomInput
            type='text'
            label='Enter Coupon Name'
            name='name'
            onChange={ formik.handleChange("name") }
            onBlur={ formik.handleChange("name") }
            value={formik.values.name }
          />
          {nameError}

          <CustomInput
            type='date'
            label='Enter Coupon Expiry Date'
            name='expiry'
            onChange={ formik.handleChange("expiry") }
            onBlur={ formik.handleChange("expiry") }
            value={formik.values.expiry }
          />
          {expiryError}

          <CustomInput
            type='number'
            label='Enter Coupon ( % ) Discount'
            name='discount'
            onChange={ formik.handleChange("discount") }
            onBlur={ formik.handleChange("discount") }
            value={formik.values.discount }
          />
          {discountError}

          <button
            type='submit'
            className='btn btn-success border-0 rounded-3 my-5'
          >
            { getCouponId !== undefined ? "Edit" : "Add" } Coupon
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon;