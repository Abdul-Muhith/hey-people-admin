import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import CustomInput from '../../components/CustomInput/CustomInput';
import './AddBlog.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Stepper } from 'react-form-stepper';

// TODO: LAST TIME OF CLASS 09
import Dropzone from 'react-dropzone';

import * as Yup from 'yup';
import { useFormik, useField } from 'formik';

import { getBlogCategories } from '../../features/blogs/BlogCategorySlice';
import { createBlog, getSingleBlog, updateBlog, resetState } from '../../features/blogs/BlogSlice';

// TODO: UPLOAD BLOG IMAGE SLICE HERE
import { uploadProductImg } from '../../features/upload/UploadSlice';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const AddBlog = () => {
  const [desc, setDesc] = useState();

  const handeDesc = (e) => { console.log(e); }

  // TODO: LAST TIME OF CLASS 09
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getBlogId = (location.pathname.split('/')[3]);

  const blogCategoriesState = useSelector((state) => state.blogCategory?.blogCategories);
  const blogImagesState = useSelector((state) => state.upload?.blogImagesState);
  const newBlog = useSelector((state) => state.blogs);
  const { isSuccess, isError, isLoading, createdBlog, blogTitle, blogCategory, blogDescription, updatedBlog } = newBlog;

//   const props = {
//   name: 'file',
//   multiple: true,
//   action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== 'uploading') {
//       console.log(info.file, info.fileList);
//     }
//     if (status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log('Dropped files', e.dataTransfer.files);
//   },
// };

  let schema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    category: Yup.string().required("Category is Required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // title: '',
      // description: '',
      // category: '',
      // images: '',
      title: blogTitle || "",
      // description: removeTag(blogDescription) || "",
      description: blogDescription || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlog(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/blog-list');
        // }, 3000);
        }, 300);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [])

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getSingleBlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added successfully!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated successfully!");
      navigate('/admin/blog-list');
    }
    if (isError) {
      toast.error("Something wrong with adding Blog!");
    }
  // }, [isSuccess, isError, isLoading, createdBlog]);
  }, [isSuccess, isError, isLoading]);

  const titleError = formik.touched.title && formik.errors.title && (
    <div className='error'>
        {formik.errors.title}
    </div>
  )

  const descriptionError = formik.touched.description && formik.errors.description ? (
    <div className='error'>
        {formik.errors.description}
    </div>
  ) : null;

  const categoryError = formik.touched.category && formik.errors.category ? (
    <div className='error'>
        {formik.errors.category}
    </div>
  ) : null;

  return (
    <div>
      <h3 className='mb-4 title'>
        { getBlogId !== undefined ? "Edit" : "Add" } Blog
      </h3>

      <Stepper
        steps={ [
          { label: 'Add Blog Details' },
          { label: 'Upload Images' },
          { label: 'Finish' }
        ] }
        activeStep={1}
      />

      <div className=''>
        <form onSubmit={formik.handleSubmit} >

          {/* <Dragger {...props}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.</p>
          </Dragger> */}

          <div className='bg-white text-center border-1 p-5'>
            <Dropzone onDrop={ acceptedFiles => dispatch(uploadProductImg(acceptedFiles)) }>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className='showimages d-flex flex-wrap gap-3'>
            { blogImagesState?.map((i, j) => {
              return (
                <div key={ j } className='position-relative'>
                  <button
                    type='button'
                    className='btn-close position-absolute'
                    style={ { top: "10px", right: "10px" } }
                  ></button>
                  <img src={i.url} alt='' width={200} height={200} />
                </div>
              )
            })}
          </div>

          <div className='mt-4'>
            {/* <CustomInput type='text' label='Enter Blog Title' /> */}
            <CustomInput
              type='text'
              label='Enter Blog Title'
              name='title'
              onChange={ formik.handleChange("title") }
              onBlur={ formik.handleChange("title") }
              value={formik.values.title }
            />
          </div>
          {titleError}

          {/*<select className='form-control py-3 mt-4'>
            <option>Select Blog Category</option>
          </select> */}

          <select
            className='form-control py-3 mt-4 form-select'
            name='category'
            onChange={ formik.handleChange("category") }
            onBlur={ formik.handleBlur("category") }
            value={formik.values.category }
          >

            {/* <option>Select Blog Category</option> */ }
            { (getBlogId === undefined) && <option>Select Blog Category</option> }

            { blogCategoriesState.map((item, key) => {
              return (
                <option value={ item.title } key={ key }>
                  { item.title }
                </option>
              )
            }) }
          </select>
          { categoryError }

          {/* <ReactQuill
            theme="snow"
            value={ desc }
            className='mt-4'
            onChange={ (e) => { handeDesc(e) } }
          /> */}

          <ReactQuill
            theme="snow"
            name='description'
            onChange={ formik.handleChange("description") }
            onBlur={ formik.handleBlur("description") }
            value={ formik.values.description }
            className='mt-4'
          />
          {descriptionError}

          <button
            type='submit'
            className='btn btn-success border-0 rounded-3 my-5'
          >
            { getBlogId !== undefined ? "Edit" : "Add" } Blog
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog;