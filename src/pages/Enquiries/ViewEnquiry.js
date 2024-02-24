import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BiArrowBack } from "react-icons/bi";

import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { findObjByIdInArray } from '../../utils/findObjByIdInArray';

import { getEnquiries, getSingleEnquiry, updateEnquiry, resetState } from '../../features/enquiries/EnquiriesSlice';

const ViewEnquiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const getEnquiryId = (location.pathname.split('/')[4]);
  // console.log('getEnquiryId -> ',getEnquiryId);

  const enquiryState = useSelector((state) => state.enquiry);
  // console.log('enquiryState -> ', enquiryState);
  // console.log('enquiryState enquiries -> ', enquiryState.enquiries);
  // const { enquiries, currentEnquiry } = useSelector((state) => state.enquiry);
  // const { isSuccess, isError, isLoading } = enquiries;

  // const currentEnquiry = findObjByIdInArray(enquiryState.enquiries, getEnquiryId);
  // const currentEnquiry = enquiryState.currentEnquiry;
  // console.log('Current Enquiry -> ', currentEnquiry);
  // const { name, email, mobile, comments, status } = currentEnquiry;
  const { enquiryName, enquiryEmail, enquiryMobile, enquiryComments, enquiryStatus, updatedEnquiry } = enquiryState;

  useEffect(() => {
    if (getEnquiryId !== undefined) {
      dispatch(getSingleEnquiry(getEnquiryId));
      // formik.values.name = couponName;
      // formik.values.expiry = couponExpiry;
      // formik.values.discount = couponDiscount;
    } else {
      dispatch(resetState());
    }
  // }, [getEnquiryId, updatedEnquiry]); // todo: যদি handleEnquiryStatus এর ভিতরে করি তাহলে এটুকুর দরকার নেই।
  }, [getEnquiryId]);

  const goBack = () => navigate(-1);

  const handleEnquiryStatus = (value, enquiryId) => {
    // console.log('handleEnquiryStatus -> ', value);
    // console.log("enquiryId -> ", enquiryId);
    const data = {id: enquiryId, enquiryData: value}
    dispatch(updateEnquiry(data));

    // todo: যদি useEffect[updatedEnquiry] এর ভিতরে করি তাহলে এটুকুর দরকার নেই।
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getSingleEnquiry(getEnquiryId));
    }, 100);
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className="mt-4 title">Enquiries</h3>
        <button
          onClick={ goBack }
          className='bg-transparent border-0 fs-6 mt-3 d-flex align-items-center gap-1'
        >
          <BiArrowBack className='fs-5' />Go Back
        </button>
      </div>
      <div className='mt-5 bg-white p-4 rounded-3 d-flex flex-column gap-3'>
        <div className='d-flex align-items-center gap-3'>
          <h5 className='mb-0'>Name:</h5>
          <p className='mb-0'>{ enquiryName }</p>
        </div>

        <div className='d-flex align-items-center gap-3'>
          <h5 className='mb-0'>Email:</h5>
          <p className='mb-0'>
            <a href={ `mailto:${enquiryEmail}` }>
              { enquiryEmail }
            </a>
          </p>
        </div>

        <div className='d-flex align-items-center gap-3'>
          <h5 className='mb-0'>Mobile:</h5>
          <p className='mb-0'>
            <a href={ `tel:+0088${enquiryMobile}` }>
              { enquiryMobile }
            </a>
          </p>
        </div>

        <div className='d-flex align-items-center gap-3'>
          <h5 className='mb-0'>Comments:</h5>
          <p className='mb-0'>{ enquiryComments }</p>
        </div>

        <div className='d-flex align-items-center gap-3'>
          <h5 className='mb-0'>Status:</h5>
          <p className='mb-0'>{ enquiryStatus }</p>
        </div>

        <div className='d-flex align-items-center gap-3'>
          <h5 className='mb-0'>Change Status:</h5>
          <div>
            <select
              name=''
              defaultValue={ enquiryStatus ? enquiryStatus : "--Select Status--" }
              // defaultValue={ enquiryStatus }
              className='form-control form-select'
              id=''
          // onChange={(event) => handleEnquiryStatus(event.target.value, enquiryState[i]._id)}
          onChange={(event) => handleEnquiryStatus(event.target.value, getEnquiryId)}
          // onChange={(event) => handleEnquiryStatus(event.target.value)}
            >

              {/* { (enquiryStatus === undefined) && <option defaultValue="default">Select Status</option> } */ }

              {/* {enquiryStatus ? <option value={ enquiryStatus }>{ enquiryStatus }</option> : <option value="--Select Status--">--Select Status--</option>} */ }

              <option value={ enquiryStatus ? "--Select Status--" : enquiryStatus }>
                { enquiryStatus ? "--Select Status--" : enquiryStatus }
              </option>
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ViewEnquiry;