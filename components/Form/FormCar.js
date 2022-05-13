import React from 'react';
import './Form.css';
import Alert from '../Alert/Alert';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({
    forminputs,
    uploadImageCall,
    handleSubmit,
    handleChange,
    title,
    header,
}) => {
    return (
        <div>
            <Alert />
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <form onSubmit={handleSubmit} className="form">
                    <h3 className="form__title">{header}</h3>
                    {forminputs.map((forminput) => (
                        <div className="form__form-group">
                            {forminput.label && (
                                <label htmlFor="input-field">{forminput.label}</label>
                            )}
                            {forminput.type === "select" &&
                                <select
                                    name={forminput.name}
                                    className="form-control"
                                    onChange={handleChange}
                                    value={forminput.value}
                                >
                                    <option value=""> -- select -- </option>
                                    {forminput.data &&
                                        forminput.data.map((record) => (
                                            <option
                                                key={record._id}
                                                value={record._id}
                                                selected={record._id === forminput.data._id}
                                            >
                                                {record.brand_name || record.city_name || record.feature_name || record.fullname || record.name}
                                            </option>
                                        ))}
                                </select>
                            }
                            {forminput.type == 'file' && (
                                <input
                                    type={forminput.type}
                                    value={forminput.value}
                                    name={forminput.name}
                                    className="form-control"
                                    placeholder={forminput.placeholder}
                                    onChange={(e) => {
                                        uploadImageCall(e);
                                    }}
                                />
                            )}
                            {forminput.type == 'text' && (
                                <input
                                    type={forminput.type}
                                    value={forminput.value}
                                    name={forminput.name}
                                    className="form-control"
                                    placeholder={forminput.placeholder}
                                    onChange={handleChange}
                                />
                            )}
                            {forminput.type == 'date' && (
                                <DatePicker
                                    selected={forminput.value}
                                    minDate={new Date()}
                                    placeholderText={forminput.placeholder}
                                    name={forminput.name}
                                    onChange={(date) => forminput.handleChange(forminput.name,date)} />
                            )}

                            {forminput.type == 'time' && (
                                <DatePicker
                                    selected={(forminput.value)}
                                    onChange={(date) => forminput.handleChange(date)}
                                    showTimeSelect
                                    placeholderText={forminput.placeholder}
                                    name={forminput.name}
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                />
                            )}

                        </div>
                    ))}
                    <button type="submit" className="form__btn form__btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
