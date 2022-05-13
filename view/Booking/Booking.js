import React, { useEffect, useState } from "react";
import "./Booking.css";
import Table from "../../components/TableBookings/Table";
import {
  getAllBookings,
  getBookingsByStatus,
} from "../../features/booking/booking.action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Bookings = () => {
  let dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.booking);
  const [value, setValue] = useState();
  const getBookingListByStatus = (status) => {
    dispatch(getBookingsByStatus(status));
  };
  const location = useLocation();
  
  // useEffect(() => {
  //   dispatch(getAllBookings());
  // }, []);


  useEffect(() => {
    if (location?.hash == "#pending") {
      getBookingListByStatus("pending");
      setValue(1);
    } else if (location?.hash == "#accepted") {
      getBookingListByStatus("accepted");
      setValue(2);
    } else if (location?.hash == "#started") {
      getBookingListByStatus("started");
      setValue(3);
    } else if (location?.hash == "#ended") {
      getBookingListByStatus("ended");
      setValue(4);
    } else if (location?.hash == "#cancelled") {
      getBookingListByStatus("cancelled");
      setValue(5);
    } else if (location?.hash == "#arrived") {
      getBookingListByStatus("arrived");
      setValue(6);
    } else if (location?.hash == "#all" || location?.hash == "") {
      dispatch(getAllBookings());
      setValue(0);
    }
  }, []);
  return (
    <div className="bookings">
      <Table
        header={"Trips"}
        loading={loading}
        bookings={bookings}
        getAllBooking={getAllBookings}
        value={value}
        setValue={setValue}
        getBookingListByStatus={getBookingListByStatus}
      />
    </div>
  );
};

export default Bookings;
