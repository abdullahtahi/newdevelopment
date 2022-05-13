import React, { useState } from "react";
import Form from "../../components/Form/FormChangePassword";
import { changePassword } from "../../features/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "../../features/alert/alert.action";
import CircularProgress from "@material-ui/core/CircularProgress";
const ChangePassword = () => {
  let dispatch = useDispatch();
  const { loading, userId } = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState({
    curr_pass: "",
    confirm_pass: "",
    new_pass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !inputValue.new_pass &&
      !inputValue.confirm_pass &&
      !inputValue.curr_pass
    ) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }
    if (inputValue.new_pass.length < 7) {
      dispatch(
        setAlertMessage("Password should be more than 8 characters.", "error")
      );
      return;
    }
    if (inputValue.confirm_pass != inputValue.new_pass) {
      dispatch(setAlertMessage("Passwords doesn't match.", "error"));
      return;
    }

    const body = {
      curr_pass: inputValue.curr_pass,
      confirm_pass: inputValue.confirm_pass,
      new_pass: inputValue.new_pass,
    };
    dispatch(changePassword(userId, body));
  };

  const inputFields = [
    {
      label: "Current Password",
      type: "password",
      value: inputValue.curr_pass,
      name: "curr_pass",
      placeholder: "Enter Current Password here",
    },
    {
      label: "New Password",
      type: "password",
      value: inputValue.new_pass,
      name: "new_pass",
      placeholder: "Enter New Password here",
    },
    {
      label: "Confirm Password",
      type: "password",
      value: inputValue.confirm_pass,
      name: "confirm_pass",
      placeholder: "Enter Confirm Password here",
    },
  ];
  return (
    <>
      <div className="mainForm">
        {loading ? (
          <CircularProgress className="loader" />
        ) : (
          <Form
            forminputs={inputFields}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            header="Change Password"
          />
        )}
      </div>
    </>
  );
};

export default ChangePassword;
