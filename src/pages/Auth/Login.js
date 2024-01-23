import { Link } from 'react-router-dom';

import CustomInput from '../../components/CustomInput/CustomInput';

const Login = () => {
  return (
    <>
      {/* <div>Login</div> */}

      <div className='py-5' style={{background: "#ffd333", minHeight: "100vh" }} >
        <div className="bg-white w-25 mx-auto rounded-3 my-5 p-4">
          <h3 className='text-center title'>Sign In</h3>
          <p className='text-center'>Sign In to your account to continue.</p>
          <form>
            <CustomInput type='text' id="email" label="Email address" />
            <CustomInput type='password' id="password" label="Password" />

            <div className='mb-3 text-end'>
              <Link to='forgot-password'>Forgot Password?</Link>
            </div>

            <Link to='/admin' type='submit' className='border-0 px-3 py-2 w-100 fw-bold text-white text-center d-block text-decoration-none fs-5' style={ { background: "#ffd333" } } >Login</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;