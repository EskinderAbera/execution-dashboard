import { useLocation } from "react-router-dom";
import MaterialTable from "material-table";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import EditForm from "../components/EditForm";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Typography, Breadcrumbs } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const KPIList = () => {
  const location = useLocation();
  const { kpis } = useStateContext();
  const columns = [
    { title: "KPI Title", field: "kpi_name" },
    { title: "Perspective", field: "perspective_name" },
    { title: "Objective", field: "objective_name" },
    { title: "Months Left", field: "numberOfmonthsLeft" },
  ];
  const [open, setOpen] = useState(false);
  const [datum, setDatum] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleShow = (rowData) => {
    setOpen(true);
    setDatum(rowData);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    handleClose();
  }, [kpis]);

  return (
    <div style={{ maxWidth: "80%", marginLeft: "20px" }}>
      <div
        role="presentation"
        style={{ marginBottom: "20px", marginLeft: "10px" }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Typography underline="hover" color="inherit" href="#">
            {location.state.route.first}
          </Typography>
          <Typography underline="hover" color="inherit" href="#">
            {location.state.route.second}
          </Typography>
          <Typography color="text.primary">
            {location.state.route.third}
          </Typography>
        </Breadcrumbs>
      </div>
      <MaterialTable
        columns={columns}
        data={kpis}
        actions={[
          {
            icon: "edit",
            tooltip: "edit kpi",
            onClick: (event, rowData) => handleShow(rowData),
          },
        ]}
        title="KPIS"
        detailPanel={(rowData) => {
          return (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>January</th>
                  <th>February</th>
                  <th>March</th>
                  <th>April</th>
                  <th>May</th>
                  <th>June</th>
                  <th>July</th>
                  <th>August</th>
                  <th>September</th>
                  <th>October</th>
                  <th>November</th>
                  <th>December</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{rowData.January > 0 ? rowData.January : "-"}</td>
                  <td>{rowData.February > 0 ? rowData.February : "-"}</td>
                  <td>{rowData.March > 0 ? rowData.March : "-"}</td>
                  <td>{rowData.April > 0 ? rowData.April : "-"}</td>
                  <td>{rowData.May > 0 ? rowData.May : "-"}</td>
                  <td>{rowData.June > 0 ? rowData.June : "-"}</td>
                  <td>{rowData.July > 0 ? rowData.July : "-"}</td>
                  <td>{rowData.August > 0 ? rowData.August : "-"}</td>
                  <td>{rowData.September > 0 ? rowData.September : "-"}</td>
                  <td>{rowData.October > 0 ? rowData.October : "-"}</td>
                  <td>{rowData.November > 0 ? rowData.November : "-"}</td>
                  <td>{rowData.December > 0 ? rowData.December : "-"}</td>
                </tr>
              </tbody>
            </Table>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{ minWidth: `${window.innerWidth <= 760 ? "" : "50%"}` }}
      >
        <DialogTitle>Edit KPI</DialogTitle>
        <DialogContent>
          <EditForm theEmployee={datum} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KPIList;
