import React, { useState } from "react";
import Form from "../../components/Form/Form";
import { addSupportUser } from "../../features/support/support.action";
import { setAlertMessage } from "../../features/alert/alert.action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
const SupportForm = () => {
  let dispatch = useDispatch();
  const { saved } = useSelector((state) => state.support);
  const userRole = "representative";
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  let regEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleChange = (_name, value) => {
    setInputValue((prev) => ({
      ...prev,
      [_name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.email || !inputValue.password) {
      dispatch(setAlertMessage("Please fill properly.", "error"));
      return;
    }
    if (inputValue.email && !regEmail.test(inputValue.email)) {
      dispatch(setAlertMessage("Invalid Email", "error"));
      return;
    }
    if (inputValue.password && inputValue.password.length < 8) {
      dispatch(
        setAlertMessage("Password should be more than 8 characters.", "error")
      );
      return;
    }
    dispatch(addSupportUser(inputValue.email, inputValue.password, userRole));
  };
  if (saved == true) {
    return <Redirect to="/support" />;
  }
  const inputFields = [
    {
      label: "Email",
      type: "email",
      value: inputValue.email,
      name: "email",
      placeholder: "Enter email here",
    },
    {
      label: "Password",
      type: "password",
      value: inputValue.password,
      name: "password",
      placeholder: "Enter password here",
    },
  ];
  return (
    <>
      <div className="mainForm">
        <Form
          forminputs={inputFields}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          header="Support User"
        />
      </div>
    </>
  );
};

export default SupportForm;
