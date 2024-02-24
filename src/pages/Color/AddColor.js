// AFTER CLASS 09
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import CustomInput from '../../components/CustomInput/CustomInput';

import { createColor, getSingleColor, updateColor, resetState } from '../../features/color/ColorSlice';

const AddColor = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getColorId = (location.pathname.split('/')[3]);

  const newColor= useSelector((state) => state.color);
  const { isSuccess, isError, isLoading, createdColor, colorTitle, updatedColor } = newColor;

  let schema = Yup.object().shape({
    title: Yup.string().required("Color is Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: colorTitle || '',
    },
    validationSchema: schema,
    onSubmit: values => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
          navigate('/admin/color-list');
        }, 300);
      }

      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getSingleColor(getColorId));
      formik.values.title = colorTitle;
    } else {
      dispatch(resetState());
    }
  }, [getColorId, colorTitle])

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added successfully!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated successfully!");
      navigate('/admin/color-list');
    }
    if (isError) {
      toast.error("Something wrong with adding Color!");
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
        { getColorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div className=''>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type='color'
            label='Enter Color'
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
            { getColorId !== undefined ? "Edit" : "Add" } Color
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddColor;