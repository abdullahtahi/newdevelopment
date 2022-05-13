import React, { useEffect } from "react";
import {
  getAllDisputes,
  getDisputesByStatus,
} from "../../features/dispute/dispute.action";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import "./Dispute.css";
import Table from "../../components/TableDisputes/Table";
import { useLocation } from "react-router-dom";

const Dispute = () => {
  let dispatch = useDispatch();
  const [value, setValue] = React.useState();
  const location = useLocation();


const handleChangeTabs = (e,newValue)=>{
  setValue(newValue)
}
  const { disputes, loading } = useSelector((state) => state.dispute);

  const getDisputeListByStatus = (status) => {
    dispatch(getDisputesByStatus(status));
  };
  useEffect(() => {
    if (location?.hash == "#open") {
      getDisputeListByStatus("open");
      setValue(1);
    } else if (location?.hash == "#close") {
      getDisputeListByStatus("close");
      setValue(2);
    } else if (location?.hash == "#all" || location?.hash == "") {
      dispatch(getAllDisputes());
      setValue(0);
    }
  }, []);

  return (
    <div className="dispute">
      <Table
      handleChangeTabs={handleChangeTabs}
        header={"Disputes"}
        path={"disputes"}
        loading={loading}
        disputes={disputes}
        value={value}
        getDisputeByStatus={getDisputeListByStatus}
        getAllDisputes={getAllDisputes}
      />
    </div>
  );
};

export default Dispute;
