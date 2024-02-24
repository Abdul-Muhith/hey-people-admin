import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getBlogCategories, deleteBlogCategory, resetState } from '../../features/blogs/BlogCategorySlice';

import CustomModal from '../../components/CustomModal/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

// const data1 = [];

// for (let i = 1; i < 46; i++) {
//   data1.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: 32,
//     status: `London, Park Lane no. ${i}`,
//   });
// }

const BlogCategoryList = () => {
  const [open, setOpen] = useState(false);
  const [blogCategoryId, setBlogCategoryId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (e) => {
    setOpen(true);
    setBlogCategoryId(e);
  }

  const hideModal = () => { setOpen(false); }

  const blogCategoriesState = useSelector((state) => state.blogCategory.blogCategories);
  // console.log(blogCategoriesState);
  const { deletedBlogCategory } = useSelector((state) => state.blogCategory);

  const data1 = [];

  for (let i = 0; i < blogCategoriesState.length; i++) {
    data1.push({
      key: i + 1,
      name: blogCategoriesState[i].title,
      actions: (
        <>
          <Link
            to={`/admin/update-blog-category/${ blogCategoriesState[i]._id}`}
            className='fs-3 text-secondary'
          >
            <BiEdit />
          </Link>

          <button
            // className='fs-3 ms-3 text-danger'
            // to='/'
            className='fs-3 ms-3 text-danger bg-transparent border-0'
            onClick={()  => showModal(blogCategoriesState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const removeBlogCategory = (current) => {
    // TODO: delete the brand with id
    dispatch(deleteBlogCategory(current));
    setOpen(false);

    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  // }, [getBlogCategories]);
  }, [deletedBlogCategory]);

  return (
    <div>
      <h3 className="mt-4 title">Blog Categories List</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { removeBlogCategory(blogCategoryId); }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  )
}

export default BlogCategoryList;