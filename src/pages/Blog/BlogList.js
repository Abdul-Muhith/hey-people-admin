import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { getBlogs, deleteBlog, resetState } from '../../features/blogs/BlogSlice';

import CustomModal from '../../components/CustomModal/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Description',
    dataIndex: 'description',
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

const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (e) => {
    setOpen(true);
    setBlogId(e);
  }

  const hideModal = () => { setOpen(false); }

  const blogState = useSelector((state) => state.blogs?.blogs);
  // console.log(blogState);
  const { deletedBlog } = useSelector((state) => state.blogs);

  const data1 = [];

  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      description: blogState[i].description,
      actions: (
        <>
          <Link
            to={`/admin/update-blog/${blogState[i]?._id}`}
            className='fs-3 text-secondary'
          >
            <BiEdit />
          </Link>

          <button
            // to='/'
            // className='fs-3 ms-3 text-danger'
            className='fs-3 ms-3 text-danger bg-transparent border-0'
            onClick={()  => showModal(blogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const removeBlog = (e) => {
    // TODO: delete the blog with id
    // console.log(e);
    dispatch(deleteBlog(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [deletedBlog]);

  return (
    <div>
      <h3 className="mt-4 title">Blog List</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { removeBlog(blogId); }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  )
}

export default BlogList;