import CustomInput from "../../components/CustomInput/CustomInput";

const ResetPassword = () => {
  return (
    <>
      {/* <div>ResetPassword</div> */}

      <div className='py-5' style={{background: "#ffd333", minHeight: "100vh" }} >
        <div className="bg-white w-25 mx-auto rounded-3 my-5 p-4">
          <h3 className='text-center title'>Reset Password</h3>
          <p className='text-center'>Please enter your new password.</p>
          <form>
            <CustomInput type='password' id="newpassword" label="New Password" />
            <CustomInput type='password' id="confirmpassword" label="Confirm Password" />
            <button type='submit' className='border-0 px-3 py-2 w-100 fw-bold text-white' style={{background: "#ffd333"}} >Reset Password</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;