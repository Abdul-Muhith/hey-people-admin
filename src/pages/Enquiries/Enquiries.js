import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { getEnquiries, deleteEnquiry, updateEnquiry, resetState } from '../../features/enquiries/EnquiriesSlice';

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
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Comments',
    dataIndex: 'comments',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Date',
    dataIndex: 'date',
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

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enquiryId, setEnquiryId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (e) => {
    setOpen(true);
    setEnquiryId(e);
  }

  const hideModal = () => { setOpen(false); }

  const handleEnquiryStatus = (value, enquiryId) => {
    // console.log('handleEnquiryStatus -> ', value);
    // console.log("enquiryId -> ", enquiryId);
    const data = {id: enquiryId, enquiryData: value}
    dispatch(updateEnquiry(data));
  };

  const enquiryState = useSelector((state) => state.enquiry?.enquiries);
  // console.log(enquiryState);
  const { deletedEnquiry, updatedEnquiry } = useSelector((state) => state.enquiry);

  const data1 = [];

  for (let i = 0; i < enquiryState?.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comments: enquiryState[i].comments,
      status: (<>
        <select
          name=""
          className='form-control form-select'
          defaultValue={enquiryState[i].status ? enquiryState[i].status : "Submitted"}
          id=""
          // onClick={handleEnquiryStatus(enquiryState[i]._id)}
          // onChange={(event) => handleEnquiryStatus(event, enquiryState[i]._id)}
          onChange={(event) => handleEnquiryStatus(event.target.value, enquiryState[i]._id)}
        >
          <option value={ enquiryState[i].status ? "--Set Status--" : enquiryState[i].status }>
            { enquiryState[i].status ? "--Set Status--" : enquiryState[i].status }
          </option>
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </>),
      // date: enquiryState[i].createdAt,
      date: new Date(enquiryState[i].createdAt).toLocaleString(),
      actions: (
        <>
          <Link
            to={`/admin/enquiries/view-enquiry/${enquiryState[i]?._id}`}
            className='fs-3 text-secondary'>
            <AiOutlineEye />
          </Link>
{/*
          <Link to='/' className='fs-3 ms-3 text-danger'>
            <AiFillDelete />
          </Link> */}

          <button
            className='fs-3 ms-3 text-danger bg-transparent border-0'
            onClick={()  => showModal(enquiryState[i]._id)}
            >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  };

  const removeEnquiry = (e) => {
    // TODO: delete the enquiry with id
    // console.log(e);
    dispatch(deleteEnquiry(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  // }, [deletedEnquiry, updatedEnquiry]); // todo: এটা করা হলে সে রিলোড নিচ্ছে। তাই আপাতত এটা করছি না।
  }, [deletedEnquiry]);

  return (
    <div>
      <h3 className="mt-4 title">Enquiries</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { removeEnquiry(enquiryId); }}
        title="Are you sure you want to delete this Enquiry?"
      />
    </div>
  )
}

export default Enquiries;