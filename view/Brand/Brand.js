import React, { useEffect } from "react";
import { deleteBrand, getAllBrands } from "../../features/brand/brand.action";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import { makeStyles, Tooltip, Grid } from "@material-ui/core";
import SearchTable from "../../components/SearchTable/SearchTable";
import "./Brand.css";

const Brand = () => {
  let dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getAllBrands());
  }, []);

  const deleteFunctionCall = (id) => {
    dispatch(deleteBrand(id));
  };

  const renderImage = (params) => {
    return <img src={params.image} style={{ width: 50, height: 50 }} />;
  };

  const renderActionButton = (params) => {
    return (
      <>
        <Grid item>
          <Tooltip title="Edit">
            <Link to={`/company/edit/${params.action}`}>
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
        </Grid>
      </>
    );
  };
  const columns = [
    {
      field: "id",
      title: "S#",
    },

    {
      field: "image",
      title: "Image",
      render: renderImage,
    },
    {
      field: "brand",
      title: "Name",
    },
    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];

  let rows = [];
  if (brands) {
    let s = 1;
    brands.forEach((brand) => {
      rows.push({
        id: s++,
        brand: brand.name,
        image: brand.image,
        action: brand._id,
      });
    });
  }

  return (
    <>
      <div className="feature">
        <SearchTable
          rows={rows}
          columns={columns}
          header={"Make"}
          loading={loading}
          path={"company"}
        />
      </div>
    </>
  );
};

export default Brand;
