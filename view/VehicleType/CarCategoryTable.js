import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchClickRow";
import { getAllCategories } from "../../features/car_category/carcategory.action";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../Support/Support.css";

const CategoryPricing = () => {
  let dispatch = useDispatch();
  const { car_categories, loading } = useSelector((state) => state.carcategory);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const renderActionButton = (params) => {
    return (
      <Tooltip title="Edit">
        <Link to={`/category/edit/${params.action}`}>
          <EditIcon
            fontSize="medium"
            style={{
              padding: 2,
              border: "1px solid #1F1D61",
              borderRadius: 8,
              backgroundColor: "white",
              color: "#1F1D61",
            }}
          />
        </Link>
      </Tooltip>
    );
  };
  const columns = [
    { field: "id", title: "S#" },
    {
      field: "name",
      title: "Name",
    },
    {
      field: "min",
      title: "Min Weight",
    },
    {
      field: "max_weight",
      title: "Max Weight",
    },
    {
      field: "rent",
      title: "Rent",
    },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  let rows = [];
  if (car_categories) {
    let s = 1;
    car_categories.forEach((category) => {
      rows.push({
        id: s++,
        name: category?.type,
        rent: category?.rent,
        min: category?.min_weight,
        max_weight: category?.max_weight,
        action: category?._id,
      });
    });
  }
  return (
    <div className="feature">
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Vehicle type"}
        path={"category"}
        loading={loading}
      />
    </div>
  );
};

export default CategoryPricing;
