import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
 import * as Yup from 'yup';

import CustomInput from '../../components/CustomInput/CustomInput';
import { login } from '../../features/auth/AuthSlice';

//  ACCORDING TO MEMORIES PROJECT
// import { login } from '../../actions/auth';

import './Auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    // console.log(user);
    if (!user == null || isSuccess) {
      navigate("/admin");
    }
  }, [user, isError, isLoading, isSuccess, message]);

  let schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });

  const emailError = formik.touched.email && formik.errors.email && (
    <div className='error'>
        {formik.errors.email}
    </div>
  )

  const passwordError = formik.touched.password && formik.errors.password ? (
    <div className='error'>
        {formik.errors.password}
    </div>
  ) : null;

  return (
    <>
      <div className='py-5' style={{background: "#ffd333", minHeight: "100vh" }} >
        <div className="bg-white w-25 mx-auto rounded-3 my-5 p-4">
          <h3 className='text-center title'>Sign In</h3>
          <p className='text-center'>Sign In to your account to continue.</p>

          <div className='error text-center'>
            {message.message == "Rejected" ? "You are not an Admin" : ""}
          </div>

          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              name='email'
              type='text'
              id="email"
              label="Email address"
              onChange={ formik.handleChange }
              value={ formik.values.email }
            />
            { emailError }

            <CustomInput
              name='password'
              type='password'
              id="password"
              label="Password"
              onChange={ formik.handleChange }
              value={ formik.values.password }
            />
            { passwordError }

            <div className='mb-3 text-end'>
              <Link to='forgot-password'>Forgot Password?</Link>
            </div>

            <button
              type='submit'
              className='border-0 px-3 py-2 w-100 fw-bold text-white text-center d-block text-decoration-none fs-5'
              style={ { background: "#ffd333" } } >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;