// AFTER CLASS 09
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import CustomInput from '../../components/CustomInput/CustomInput';

import { createBrand, getSingleBrand, resetState, updateBrand } from '../../features/brands/BrandSlice';

const AddProductBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log('location -> ', location);
  // console.log('location pathname -> ', location.pathname);
  // console.log('location pathname split -> ', location.pathname.split('/'));
  // TODO: উনি এভাবে করছে কিন্তু আমি লেংথ থেকে ১ বাদ দিতেছি যেনো সব সময়ের জন্য আমার কাজটি কার্যকরী হয়। অবশেষে উনার মতো না করার কুফল আমি ভোগ করেছি যে, কোন আইডি না পেলেও সে ব্রেন্ড পেয়ে যাচ্ছে, ফলে আনডিফাইন্ড হওয়ার কোন সুযোগই অবশিষ্ট থাকছে না।
  // console.log('location pathname split [3] -> ', location.pathname.split('/')[3]);
  // console.log('location pathname split [length -1] -> ', location.pathname.split('/')[location.pathname.split('/').length - 1]);
  // const getBrandId = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const getBrandId = (location.pathname.split('/')[3]);
  // console.log('getBrandId -> ', getBrandId);

  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoading, createdBrand, brandTitle, updatedBrand } = newBrand;

  let schema = Yup.object().shape({
    title: Yup.string().required("Brand Name is Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: brandTitle || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      // TODO: CLASS 11
      if (getBrandId !== undefined) {
        const data = {id: getBrandId, brandData: values};
        dispatch(updateBrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/brand-list');
        }, 300);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getSingleBrand(getBrandId));
      formik.values.title = brandTitle;
    } else {
      dispatch(resetState());
    }
  }, [getBrandId, brandTitle]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added successfully!");
    }
    if ( isSuccess && updatedBrand ) {
      toast.success("Brand Updated successfully!");
      navigate('/admin/brand-list');
    }
    if (isError) {
      toast.error("Something Went wrong with Brand!");
    }
  }, [isSuccess, isError, isLoading])

  const titleError = formik.touched.title && formik.errors.title && (
    <div className='error'>
        {formik.errors.title}
    </div>
  )

  return (
    <div>
      <h3 className='mb-4 title'>
        { getBrandId !== undefined ? "Edit " : "Add " } Product Brand
      </h3>
      <div className=''>
        <form onSubmit={formik.handleSubmit} >
          <CustomInput
            type='text'
            label='Enter Product Brand'
            name='title'
            onChange={ formik.handleChange("title") }
            onBlur={ formik.handleChange("title") }
            value={ formik.values.title }
          />
          {titleError}

          <button
            type='submit'
            className='btn btn-success border-0 rounded-3 my-5'
          >
            { getBrandId !== undefined ? "Edit " : "Add " } Product Brand
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProductBrand;