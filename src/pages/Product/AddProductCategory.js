// AFTER CLASS 09
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import CustomInput from '../../components/CustomInput/CustomInput';

import { createProductCategory, getSingleProductCategory, updateProductCategory, resetState } from '../../features/products/ProductCategorySlice';

const AddProductCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getProductCategoryId = (location.pathname.split('/')[3]);

  const newProductCategory = useSelector((state) => state.productCategory);
  const { isSuccess, isError, isLoading, createdProductCategory, productCategoryTitle, updatedProductCategory } = newProductCategory;

  let schema = Yup.object().shape({
    title: Yup.string().required("Product Category Name is Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: productCategoryTitle || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getProductCategoryId !== undefined) {
        const data = { id: getProductCategoryId, productCategoryData: values };
        dispatch(updateProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createProductCategory(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/category-list');
        }, 300);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (getProductCategoryId !== undefined) {
      dispatch(getSingleProductCategory(getProductCategoryId));
      formik.values.title = productCategoryTitle;
    } else {
      dispatch(resetState());
    }
  }, [getProductCategoryId, productCategoryTitle])

  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Product Category Added successfully!");
    }
    if (isSuccess && updatedProductCategory) {
      toast.success("Product Category Updateed successfully!");
      navigate('/admin/category-list');
    }
    if (isError) {
      toast.error("Something wrong with adding Product Category!");
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
        { getProductCategoryId !== undefined ? "Edit" : "Add" } Product Category
      </h3>
      <div className=''>
        <form onSubmit={formik.handleSubmit} >
          <CustomInput
            type='text'
            label='Enter Product Category'
            name='title'
            onChange={ formik.handleChange("title") }
            onBlur={ formik.handleChange("title") }
            value={formik.values.title }
          />
          {titleError}

          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>{ getProductCategoryId !== undefined ? "Edit" : "Add" } Product Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddProductCategory;