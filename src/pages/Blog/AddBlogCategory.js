// AFTER CLASS 09
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import CustomInput from '../../components/CustomInput/CustomInput';

import { createBlogCategory, getSingleBlogCategory, updateBlogCategory, resetState } from '../../features/blogs/BlogCategorySlice';

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBlogCategoryId = (location.pathname.split('/')[3]);

  const newBlogCategory = useSelector((state) => state.blogCategory);
  const { isSuccess, isError, isLoading, createdBlogCategory, blogCategoryTitle, updatedBlogCategory } = newBlogCategory;

  let schema = Yup.object().shape({
    title: Yup.string().required("Blog Category Name is Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: blogCategoryTitle || "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getBlogCategoryId !== undefined) {
        const data = { id: getBlogCategoryId, blogCategoryData: values };
        dispatch(updateBlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/blog-category-list');
        }, 3000);
      }
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getSingleBlogCategory(getBlogCategoryId));
      formik.values.title = blogCategoryTitle;
    } else {
      dispatch(resetState());
    }
  }, [getBlogCategoryId, blogCategoryTitle]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added successfully!");
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success("Blog Category Updated successfully!");
      navigate('/admin/blog-category-list');
    }
    if (isError) {
      toast.error("Something wrong with adding Blog Category!");
    }
  // }, [isSuccess, isError, isLoading, createdBlogCategory])
  }, [isSuccess, isError, isLoading])

  const titleError = formik.touched.title && formik.errors.title && (
    <div className='error'>
        {formik.errors.title}
    </div>
  )

  return (
    <div>
      <h3 className='mb-4 title'>
        { getBlogCategoryId !== undefined ? "Edit" : "Add" } Blog Category
      </h3>
      <div className=''>
        <form onSubmit={formik.handleSubmit} >
          <CustomInput
            type='text'
            label='Enter Blog Catagory'
            name='title'
            onChange={ formik.handleChange("title") }
            onBlur={ formik.handleChange("title") }
            value={formik.values.title }
          />
        {titleError}

          <button
            type='submit'
            className='btn btn-success border-0 rounded-3 my-5'
          >
            { getBlogCategoryId !== undefined ? "Edit" : "Add" } Blog Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCategory;