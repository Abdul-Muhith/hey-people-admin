import CustomInput from '../../components/CustomInput/CustomInput';

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className='mb-4 title'>Add Blog Category</h3>
      <div className=''>
        <form>
          <CustomInput type='text' label='Enter Blog Catagory' />
          <button type='submit' className='btn btn-success border-0 rounded-3 my-5'>Add Blog Category</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlogCategory;