import React, { useEffect } from "react";
import SearchTable from "../../components/SearchTable/SearchTable";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Tooltip } from "@material-ui/core";
// import "./Support.css";
import api from "../../api/index";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const ViewMaps = () => {
  const [map, setMap] = React.useState("");
  const [_id, setId] = React.useState("");

  const history = useHistory();
  useEffect(() => {
    getMap();
  }, []);

  const getMap = async () => {
    try {
      const {
        data: { data },
      } = await api.get("/map");
      setMap(data[0].map);
      setId(data[0]._id);
    } catch (err) {
      history.goBack();
    }
  };

  const deleteMap = async (id) => {
    try {
      await api.put(`/map/deletemap/${_id}/${id}`);
    } catch (err) {
      console.log(err.response);
      toast.error("Region could not be deleted!");
    } finally {
      getMap();
    }
  };

  const renderActionButton = (params) => {
    return (
      <Tooltip title="Delete">
        <Button onClick={() => deleteMap(params.action)}>
          <DeleteIcon
            className="action-buttons"
            color="secondary"
            fontSize="medium"
            style={{
              padding: 2,
              border: "1px solid #F50057",
              borderRadius: 8,
              backgroundColor: "white",
              color: "#F50057",
            }}
          />
        </Button>
      </Tooltip>
    );
  };
  const columns = [
    { field: "id", title: "S#" },
    {
      field: "region",
      title: "Region",
    },

    {
      field: "action",
      title: "Action",
      render: renderActionButton,
    },
  ];
  let rows = [];
  if (map) {
    let s = 1;
    map.forEach((item) => {
      rows.push({
        id: s++,
        region: item.region,

        action: item.id,
      });
    });
  }
  return (
    <div className="feature">
      <SearchTable
        rows={rows}
        columns={columns}
        header={"Map Regions"}
        path={"regions"}
        // loading={loading}
      />
    </div>
  );
};

export default ViewMaps;
