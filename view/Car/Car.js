import React, { useEffect, useState } from "react";
import TableCars from "../../components/TableCars/Table";
import {
  getAllCars,
  getCarByStatus,
  getRealTimeAvailableCars,
  getRealTimeNonAvailableCars,
} from "../../features/car/car.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import "./Car.css";

const Car = () => {
  let dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  const [value, setValue] = useState();
  const { cars, loading } = useSelector((state) => state.car);
  const getCarListByStatus = (status) => {
    dispatch(getCarByStatus(status));
  };
  useEffect(() => {
    if (location?.hash == "#active") {
      getCarListByStatus("active");
      setValue(1);
    } else if (location?.hash == "#inactive") {
      getCarListByStatus("inactive");
      setValue(2);
    } else if (location?.hash == "#all" || location?.hash == "") {
      dispatch(getAllCars());
      setValue(0);
    }
  }, []);
  const getAvailableCars = () => {
    dispatch(getRealTimeAvailableCars());
    history.push(`/cars#available`);
  };
  const getNonAvailableCars = () => {
    dispatch(getRealTimeNonAvailableCars());
    history.push(`/cars#notavailable`);
  };

  return (
    <div className="car">
      <TableCars
        header="Vehicles"
        cars={cars}
        loading={loading}
        getCarByStatus={getCarListByStatus}
        getAllCars={getAllCars}
        getAvailableCars={getAvailableCars}
        getNonAvailableCars={getNonAvailableCars}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export default Car;
