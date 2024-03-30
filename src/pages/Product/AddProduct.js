import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// AFTER CLASS 09
import { toast } from 'react-toastify';

import CustomInput from '../../components/CustomInput/CustomInput';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// AFTER CLASS 08
// import Multiselect from 'react-widgets/Multiselect'; // TODO: remove class 09
// import "react-widgets/styles.css"; // TODO: remove class 09

import * as Yup from 'yup';
import { useFormik, useField } from 'formik';

import Dropzone from 'react-dropzone';

import { getBrands } from '../../features/brands/BrandSlice';
import { getProductCategories } from '../../features/products/ProductCategorySlice';
import { getColors } from '../../features/color/ColorSlice';
import { uploadProductImg } from '../../features/upload/UploadSlice';
import { createProducts, getSingleProduct, updateProduct, resetState } from '../../features/products/ProductSlice';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Select } from 'antd';
const { Dragger } = Upload;

// AFTER CLASS 08
  // const props = {
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

const AddProduct = () => {
  const [desc, setDesc] = useState();
  const handeDesc = (e) => { console.log(e);  }

// AFTER CLASS 08
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [brand, setBrand] = useState([]);
  const [color, setColor] = useState([]);
  const [productImages, setProductImages] = useState([]);
  // const [singleProduct, setSingleProduct] = useState();

  // const [field, state, { setValue, setTouched }] = useField(props.field.name);
  // const [field, state, { setValue, setTouched }] = useField("color");

  const getProductId = location.pathname.split('/')[3];

  let schema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    price: Yup.number().required("Price is Required"),
    category: Yup.string().required("Category is Required"),
    brand: Yup.string().required("Brand is Required"),
    quantity: Yup.number().required("Quantity is Required"),
    color: Yup.array().required("Color is Required").min(1, "Pick at least One Color"),
    tags: Yup.string().required("Tags is Required"),
  });

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand?.brands);
  // setBrand(brandState);
  // console.log('brand -> ', brandState);
  const productCategoriesState = useSelector((state) => state.productCategory.productCategories);
  const colorState = useSelector((state) => state.color?.colors);
  const productImagesState = useSelector((state) => state.upload?.productImagesState);
 // AFTER CLASS 09
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  const singleProduct = useSelector((state) => state.product?.singleProduct);

  // useEffect(() => {
  //     if (productById !== undefined) {
  //       setSingleProduct(productById);
  //       console.log('single product -> ', singleProduct);
  //       console.log('productById -> ', productById);
  //     }
  //   }, [productById]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added successfully!");
    }
    if (isError) {
      toast.error("Something wrong with adding Product!");
    }
  }, [isSuccess, isError, isLoading, createdProduct])

  // AFTER CLASS 09
  // const colors = [];
  // // const colors = ["none"];
  // colorState?.forEach((color) => {
  //   colors.push({
  //     id: color._id,
  //     color: color.title,
  //   });
  // });

  const coloropt = [];
  colorState?.forEach((color) => {
    coloropt.push({
      label: color.title,
      value: color._id,
    });
  });

  // COPIED from ColorList.js

  // for (let i = 0; i < colorState?.length; i++) {
  //   colors.push({
  //     id: i + 1,
  //     color: colorState[i].title,
  //   });
  // }

  const pImages = [];
  productImagesState?.forEach((pImage) => {
    pImages.push({
      public_id: pImage._id,
      url: pImage.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = pImages;
  }, [color, pImages]);

  const formik = useFormik({
    initialValues: {
      title: singleProduct?.title || '',
      description: singleProduct?.description || '',
      price: singleProduct?.price || '',
      category: singleProduct?.category || '',
      brand: singleProduct?.brand || '',
      quantity: singleProduct?.quantity || '',
      color: singleProduct?.color || '',
      tags: singleProduct?.tags || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      // dispatch(login(values));

      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateProduct(data));
        navigate('/admin/product-list');
      } else {
        dispatch(createProducts(values));
        formik.resetForm();

        setColor(null);

        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/product-list');
        }, 3000);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

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

  const priceError = formik.touched.price && formik.errors.price ? (
    <div className='error'>
        {formik.errors.price}
    </div>
  ) : null;

  const categoryError = formik.touched.category && formik.errors.category ? (
    <div className='error'>
        {formik.errors.category}
    </div>
  ) : null;

  const brandError = formik.touched.brand && formik.errors.brand ? (
    <div className='error'>
        {formik.errors.brand}
    </div>
  ) : null;

  const colorError = formik.touched.color && formik.errors.color ? (
    <div className='error'>
        {formik.errors.color}
    </div>
  ) : null;

  const quantityError = formik.touched.quantity && formik.errors.quantity ? (
    <div className='error'>
        {formik.errors.quantity}
    </div>
  ) : null;

  const tagsError = formik.touched.tags && formik.errors.tags ? (
    <div className='error'>
        {formik.errors.tags}
    </div>
  ) : null;

  const handleColors = (e) => {
    setColor(e);
    console.log('color -> ', color);
  }

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(resetState());
      dispatch(getSingleProduct(getProductId));
    }
  }, [getProductId]);

  return (
    <div>
      <h3 className='mb-4 title'>Add Product</h3>
      <div className=''>
        <form onSubmit={formik.handleSubmit} className='d-flex flex-column'>
          <CustomInput
            type='text'
            label='Enter Product Title'
            name='title'
            onChange={ formik.handleChange("title") }
            onBlur={ formik.handleChange("title") }
            value={ formik.values.title }
            />
          { titleError }

          <div className=''>
            <ReactQuill
              theme="snow"
              // onChange={ (e) => { handeDesc(e) } } // AFTER CLASS 08
              // value={ desc } // AFTER CLASS 08
              name='description'
              onChange={ formik.handleChange("description") }
              onBlur={ formik.handleBlur("description") }
              value={formik.values.description }
              className='mt-3'
            />
          </div>
          { descriptionError }

          <CustomInput
            type='text'
            label='Enter Product Price'
            name='price'
            onChange={ formik.handleChange("price") }
            onBlur={ formik.handleBlur("price") }
            value={ formik.values.price }
          />
          { priceError }

          <select
            className='form-control py-3 mt-3 form-select'
            name='brand'
            onChange={ formik.handleChange("brand") }
            onBlur={ formik.handleBlur("brand") }
            value={formik.values.brand }
          >
            <option value="">Select Brand</option>
            { brandState?.map((item, key) => {
              return (
                <option value={ item.title } key={ key }>
                  { item.title }
                </option>
              )
            }) }
          </select>
          { brandError }

          <select
            className='form-control py-3 mt-3 form-select'
            name='category'
            onChange={ formik.handleChange("category") }
            onBlur={ formik.handleBlur("category") }
            value={formik.values.category }
          >
            <option>Select Category</option>
            { productCategoriesState.map((item, key) => {
              return (
                <option value={ item.title } key={ key }>
                  { item.title }
                </option>
              )
            }) }
          </select>
          { categoryError }

          <select
            className='form-control py-3 mt-3 form-select'
            name='tags'
            onChange={ formik.handleChange("tags") }
            onBlur={ formik.handleBlur("tags") }
            value={formik.values.tags }
          >
            <option value="" disabled>Select Tags</option>
            {/* { blogCategoriesState.map((item, key) => { */}
              {/* return ( */}
                {/* <option value={ item.title } key={ key }> */}
                  {/* { item.title } */}
                <option value="featured">Featured</option>
                <option value="popular">Popular</option>
                <option value="special">Special</option>
              {/* ) */}
            {/* }) } */}
          </select>
          { tagsError }

          <CustomInput
            type='text'
            label='Enter Product Quantity'
            name='quantity'
            onChange={ formik.handleChange("quantity") }
            onBlur={ formik.handleBlur("quantity") }
            value={formik.values.quantity }
          />
          { quantityError }

          {/* AFTER CLASS 09 */ }
          <Select
            mode='multiple'
            allowClear
            className='w-100 mt-3'
            placeholder='Select Colors'
            defaultValue={ color }
            onChange={ (i) => handleColors(i) }
            options={coloropt}
          />
          { colorError }

          {/* AFTER CLASS 08 */ }
          {/* <Multiselect
            className='form-control form-select'
            dataKey="id"
            textField="color"
            onChange={ (event) => { setColor(event) } }
            name="color"
            data={ colors }
            defaultValue={ ["65b70035e9270c7c31c33e7a", "65b705424230c1a864c71457"] }
          /> */}

          {/* onBlur={setTouched} */}
          {/* defaultValue={[1]} */}
          {/* defaultValue={[]} */}
          {/* data={[ */}
          {/* { id: 1, color: "Red" }, */}
          {/* { id: 2, color: "Yellow" },
          { id: 3, color: "Blue" },
          { id: 4, color: "Orange" },
          ]} */}

          {/* AFTER 46 MINUTES ON CLASS 08 */}
          <div className='bg-white text-center border-1 p-5 mt-3'>
            {/* <Dropzone onDrop={ acceptedFiles => console.log(acceptedFiles) }> */}
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
            { productImagesState?.map((i, j) => {
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

          {/* <select className='form-control py-3 mb-3'>
            <option>Select Product Color</option>
          </select> */}

          {/* <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger> */}

          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>Add Product</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct;