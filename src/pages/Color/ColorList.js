import { Table } from 'antd';

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { getColors, deleteColor, resetState } from '../../features/color/ColorSlice';

import CustomModal from '../../components/CustomModal/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
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

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  }

  const hideModal = () => { setOpen(false); }

  const colorState = useSelector((state) => state.color?.colors);
  // console.log(colorState);
  const { deletedColor } = useSelector((state) => state.color);

  const data1 = [];

  for (let i = 0; i < colorState?.length; i++) {
    data1.push({
      key: i + 1,
      title: colorState[i].title,
      actions: (
        <>
          <Link
            to={ `/admin/color/${colorState[i]?._id}` }
            className='fs-3 text-secondary'
          >
            <BiEdit />
          </Link>

          {/* <Link to='/' className='fs-3 ms-3 text-danger'>
            <AiFillDelete />
          </Link> */}

          <button
            className='fs-3 ms-3 text-danger bg-transparent border-0'
            onClick={()  => showModal(colorState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const removeColor = (e) => {
    // TODO: delete the color with id
    // console.log(e);
    dispatch(deleteColor(e));
    setOpen(false);

    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  }

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [deletedColor]);

  return (
    <div>
      <h3 className="mt-4 title">Colors</h3>
      <div>
        <Table
          columns={ columns }
          dataSource={ data1 }
        />
      </div>

      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => { removeColor(colorId); }}
        title="Are you sure you want to delete this color?"
      />

    </div>
  )
}

export default ColorList;