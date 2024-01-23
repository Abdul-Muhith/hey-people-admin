import CustomInput from '../../components/CustomInput/CustomInput';

const AddProductBrand = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Add Product Brand</h3>
      <div className=''>
        <form>
          <CustomInput type='text' label='Enter Product Brand' />
          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>Add Product Brand</button>
        </form>
      </div>
    </div>
  )
}

export default AddProductBrand;