import Button from "@mui/material/Button";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import Months from "./Months";
import { Alert } from "@mui/material";

const EditForm = ({ theEmployee }) => {
  const { month, actual, updateKpi, changeActual } = useStateContext();

  const handleError = (error) => {
    <div>
      {/* {toast.error(error)};
      <Toaster /> */}
      <Alert severity="success" color="error">
        {error}
      </Alert>
    </div>;
  };

  const handleSuccess = () => {
    <div>
      {console.log("Hello")}
      {/* {toast.success("You have edited KPI Successfully!")}; */}
      {/* <Toaster /> */}
      <Alert severity="success" color="info">
        You have edit KPI Successfully!
      </Alert>
    </div>;
  };

  const editKpi = () => {
    if (month === "January") {
      theEmployee = { ...theEmployee, January: actual };
      var datas = { January: actual };
    } else if (month === "February") {
      theEmployee = { ...theEmployee, February: actual };
      datas = { February: actual };
    } else if (month === "March") {
      theEmployee = { ...theEmployee, March: actual };
      datas = { March: actual };
    } else if (month === "April") {
      theEmployee = { ...theEmployee, April: actual };
      datas = { April: actual };
    } else if (month === "May") {
      theEmployee = { ...theEmployee, May: actual };
      datas = { May: actual };
    } else if (month === "June") {
      theEmployee = { ...theEmployee, June: actual };
      datas = { June: actual };
    } else if (month === "July") {
      theEmployee = { ...theEmployee, July: actual };
      datas = { July: actual };
    } else if (month === "August") {
      theEmployee = { ...theEmployee, August: actual };
      datas = { August: actual };
    } else if (month === "September") {
      theEmployee = { ...theEmployee, September: actual };
      datas = { September: actual };
    } else if (month === "October") {
      theEmployee = { ...theEmployee, October: actual };
      datas = { October: actual };
    } else if (month === "November") {
      theEmployee = { ...theEmployee, November: actual };
      datas = { November: actual };
    } else {
      theEmployee = { ...theEmployee, December: actual };
      datas = { December: actual };
    }

    axios
      .post(
        `https://pms-apis.herokuapp.com/bsc/add/kpi/${theEmployee.kpi_id}/`,
        datas
      )
      .then((response) => {
        if (response.status === 200) {
          let numberOfmonthsLeft = parseInt(theEmployee.numberOfmonthsLeft) - 1;
          numberOfmonthsLeft = numberOfmonthsLeft.toString();
          const updatedKpi = {
            ...theEmployee,
            numberOfmonthsLeft: numberOfmonthsLeft,
          };
          handleSuccess();
          updateKpi(theEmployee.kpi_id, updatedKpi);
          changeActual(0);
        }
      })
      .catch((error) => {
        handleError(error.response.data["Error"]);
        changeActual(0);
      });
  };
  return (
    <div>
      <Months datum={theEmployee} />
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button variant="outlined" onClick={editKpi} style={{}}>
          Add
        </Button>
      </div>
    </div>
  );
};
export default EditForm;
