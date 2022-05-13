import React, { useState } from "react";
import Form from "../../components/Form/Form";
import { addAdminUser } from "../../features/admin/admin.action";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlertMessage } from "../../features/alert/alert.action";
const AdminForm = () => {
  let dispatch = useDispatch();
  const { saved, loading } = useSelector((state) => state.admin);
  const userRole = "admin";
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
    dispatch(addAdminUser(inputValue.email, inputValue.password, userRole));
  };
  if (saved == true) {
    return <Redirect to="/admins" />;
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
          header="Admin User"
        />
      </div>
    </>
  );
};

export default AdminForm;
