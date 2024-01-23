import CustomInput from "../../components/CustomInput/CustomInput";

const ForgotPassword = () => {
  return (
    <>
      {/* <div>ForgotPassword</div> */}

      <div className='py-5' style={{background: "#ffd333", minHeight: "100vh" }} >
        <div className="bg-white w-25 mx-auto rounded-3 my-5 p-4">
          <h3 className='text-center title'>Forgot Password</h3>
          <p className='text-center'>Please enter your register email to get reset password email.</p>
          <form>
            <CustomInput type='text' id="email" label="Email address" />
            <button type='submit' className='border-0 px-3 py-2 w-100 fw-bold text-white' style={{background: "#ffd333"}} >Send Link</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword;