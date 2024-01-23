import CustomInput from '../../components/CustomInput/CustomInput';

const AddProductCategory = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Add Product Category</h3>
      <div className=''>
        <form>
          <CustomInput type='text' label='Enter Product Catagory' />
          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>Add Product Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddProductCategory;