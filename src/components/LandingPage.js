import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [subProcess, setSubProcess] = useState(false);
  const [subSubProcess, setSubSubProcess] = useState(false);
  const [dept, setSubDept] = useState("");
  const [isDirector, setIsDirector] = useState(false);
  const [isGrade, setIsGrade] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [forManager, setForManager] = useState("");
  const [grades, setGrades] = useState("");
  const [isIndividual, setIsIndividual] = useState(false);
  const { roles, users, depts, subdepts, subSubDepts, changeKPIS } =
    useStateContext();
  const [disManager, setDisManager] = useState(false);
  const [managerSub, setManagerSub] = useState("");
  const [individual, setIndividual] = useState(false);
  const [forIndividual, setForIndividual] = useState("");
  const [isSubSubIndividual, setIsSubSubIndividual] = useState(false);
  const [subSubIndividual, setSubSubIndividual] = useState("");
  const [isEnd, setIsEnd] = useState(false);
  const [endprocess, setEndProcess] = useState("");
  const [role, setRole] = useState({});

  const handleChange = (event) => {
    setProcess(false);
    setSubProcess(false);
    setSubSubProcess(false);
    setIsDirector(false);
    setIsGrade(false);
    setGrades("");
    setIsIndividual(false);
    setIsManager(false);
    setForManager("");
    setDisManager(false);
    setIndividual(false);
    setIsSubSubIndividual(false);
    setIsEnd(false);

    let roleId = roles.filter((role) => {
      if (role.role_id === event.target.value) {
        return role.role_id;
      }
    });
    setRole(roleId[0]);
    if (roleId[0].hierarchy === 0) {
      let userId = users.filter((user) => {
        if (user.role === roleId[0].role_id) {
          return user.id;
        }
      });

      axios
        .get(`https://pms-apis.herokuapp.com/bsc/kpi/${userId[0].id}/`)
        .then((response) => {
          if (response.status === 200) {
            changeKPIS(response.data);

            navigate("/kpi", {
              state: {
                route: {
                  first: "kpi",
                  second: role.role_name,
                  third: userId[0].username,
                },
              },
            });
          }
        });
    } else if (roleId[0].hierarchy === 1) {
      //vp
      setProcess(true);
    } else if (roleId[0].hierarchy === 2) {
      //dir
      setSubProcess(true);
    } else if (roleId[0].hierarchy === 3) {
      //manager
      setSubSubProcess(true);
    } else if (roleId[0].hierarchy === 4) {
      //individual
      setIsIndividual(true);
    } else {
      return;
    }
  };

  const getProcessKPI = (e) => {
    let userId = users.filter((user) => {
      if (user.department === e.target.value && user.subdepartment === null) {
        return user.id;
      }
    });

    axios
      .get(`https://pms-apis.herokuapp.com/bsc/kpi/${userId[0].id}/`)
      .then((response) => {
        if (response.status === 200) {
          changeKPIS(response.data);
          navigate("/kpi", {
            state: {
              route: {
                first: "kpi",
                second: role.role_name,
                third: userId[0].username,
              },
            },
          });
        }
      });
  };

  const ProcessDropDown = () => {
    return (
      <select
        className="form-control selecting"
        onChange={(e) => getProcessKPI(e)}
        style={{ width: "200px", height: "40px" }}
      >
        <option>Select...</option>

        {depts &&
          depts.length > 0 &&
          depts.map((dept) => (
            <option key={dept.dept_id} value={dept.dept_id}>
              {dept.dept_name}
            </option>
          ))}
      </select>
    );
  };
  function handleSubProcess(e) {
    setIsDirector(true);
    setSubDept(e.target.value);
  }

  const SubProcessDropDown = () => {
    return (
      <select
        className="form-control selecting"
        value={dept}
        onChange={(e) => handleSubProcess(e)}
        style={{ width: "200px", height: "40px" }}
      >
        <option>Select...</option>

        {depts &&
          depts.length > 0 &&
          depts.map((dept) => (
            <option key={dept.dept_id} value={dept.dept_id}>
              {dept.dept_name}
            </option>
          ))}
      </select>
    );
  };

  const getSubProcessKPI = (e) => {
    e.preventDefault();
    let userId = users.filter((user) => {
      if (
        user.subdepartment === parseInt(e.target.value) &&
        user.individuals === null
      ) {
        return user.id;
      }
    });
    axios
      .get(`https://pms-apis.herokuapp.com/bsc/kpi/${userId[0].id}/`)
      .then((response) => {
        if (response.status === 200) {
          changeKPIS(response.data);
          navigate("/kpi", {
            state: {
              route: {
                first: "kpi",
                second: role.role_name,
                third: userId[0].username,
              },
            },
          });
          setSubProcess(false);
        }
      });
  };

  const SubProcessList = () => {
    return (
      <select
        className="form-control selecting"
        onChange={(e) => getSubProcessKPI(e)}
        style={{ width: "200px", height: "40px" }}
      >
        <option>Select...</option>
        {subdepts &&
          subdepts.length > 0 &&
          subdepts
            .filter((item) => item.department === dept)
            .map((subdept) => (
              <option key={subdept.id} value={subdept.id}>
                {subdept.name}
              </option>
            ))}
      </select>
    );
  };

  const getManagersKPI = (e) => {
    let userId = users.filter((user) => {
      if (
        user.sub_subdepartment === parseInt(e.target.value) &&
        user.individuals === null
      ) {
        return user.id;
      }
    });
    axios
      .get(`https://pms-apis.herokuapp.com/bsc/kpi/${userId[0].id}/`)
      .then((response) => {
        if (response.status === 200) {
          changeKPIS(response.data);
          navigate("/kpi", {
            state: {
              route: {
                first: "kpi",
                second: role.role_name,
                third: userId[0].username,
              },
            },
          });
        }
      });
  };

  const DisplaySubSubDeptManager = () => (
    <select
      className="form-control selecting"
      onChange={(e) => getManagersKPI(e)}
      style={{ width: "200px", height: "40px" }}
    >
      <option>Select...</option>
      {subSubDepts &&
        subSubDepts.length > 0 &&
        subSubDepts
          .filter((item) => item.subdepartment === parseInt(managerSub))
          .map((subsubdept) => (
            <option key={subsubdept.id} value={subsubdept.id}>
              {subsubdept.name}
            </option>
          ))}
    </select>
  );

  function dispsubsubmanager(e) {
    setDisManager(true);
    setManagerSub(e.target.value);
  }

  const DisplaySubDeptManager = () => (
    <select
      className="form-control selecting"
      value={managerSub}
      onChange={(e) => dispsubsubmanager(e)}
      style={{ width: "200px", height: "40px" }}
    >
      <option>Select...</option>
      {subdepts &&
        subdepts.length > 0 &&
        subdepts
          .filter((item) => item.department === forManager)
          .map((subdept) => (
            <option key={subdept.id} value={subdept.id}>
              {subdept.name}
            </option>
          ))}
    </select>
  );

  function navigateProcess(e) {
    setIsManager(true);
    setForManager(e.target.value);
  }

  const SubSubProcessDropDown = () => {
    return (
      <select
        className="form-control selecting"
        onChange={(e) => navigateProcess(e)}
        value={forManager}
        style={{ width: "200px", height: "40px" }}
      >
        <option>Select...</option>

        {depts &&
          depts.length > 0 &&
          depts.map((dept) => (
            <option key={dept.dept_id} value={dept.dept_id}>
              {dept.dept_name}
            </option>
          ))}
      </select>
    );
  };

  function IndividualsubsubProcess(e) {
    setIsSubSubIndividual(true);
    setSubSubIndividual(e.target.value);
  }

  const IndividualSubDropdown = () => (
    <select
      className="form-control selecting"
      value={subSubIndividual}
      onChange={(e) => IndividualsubsubProcess(e)}
      style={{ width: "200px", height: "40px" }}
    >
      <option>Select...</option>
      {subdepts &&
        subdepts.length > 0 &&
        subdepts
          .filter((item) => item.department === forIndividual)
          .map((subdept) => (
            <option key={subdept.id} value={subdept.id}>
              {subdept.name}
            </option>
          ))}
    </select>
  );

  function individualProcess(e) {
    setIndividual(true);
    setForIndividual(e.target.value);
  }

  const IndividualsDropDown = () => {
    return (
      <select
        className="form-control selecting"
        onChange={(e) => individualProcess(e)}
        value={forIndividual}
        style={{ width: "200px", height: "40px" }}
      >
        <option>Select...</option>

        {depts &&
          depts.length > 0 &&
          depts.map((dept) => (
            <option key={dept.dept_id} value={dept.dept_id}>
              {dept.dept_name}
            </option>
          ))}
      </select>
    );
  };

  function endProcess(e) {
    setIsEnd(true);
    setEndProcess(e.target.value);
  }

  const IndividualSubSubDropdown = () => (
    <select
      className="form-control selecting"
      onChange={(e) => endProcess(e)}
      value={endprocess}
      style={{ width: "200px", height: "40px" }}
    >
      <option>Select...</option>
      {subSubDepts &&
        subSubDepts.length > 0 &&
        subSubDepts
          .filter((item) => item.subdepartment === parseInt(subSubIndividual))
          .map((subsubdept) => (
            <option key={subsubdept.id} value={subsubdept.id}>
              {subsubdept.name}
            </option>
          ))}
    </select>
  );

  const getIndividualKPI = (e) => {
    let userId = users.filter((user) => {
      if (user.id === e.target.value) {
        return user.id;
      }
    });
    axios
      .get(`https://pms-apis.herokuapp.com/bsc/kpi/${e.target.value}/`)
      .then((response) => {
        if (response.status === 200) {
          changeKPIS(response.data);
          navigate("/kpi", {
            state: {
              route: {
                first: "kpi",
                second: role.role_name,
                third: userId[0].username,
              },
            },
          });
          setSubProcess(false);
        }
      });
  };

  const IndividualDropdown = () => (
    <select
      className="form-control selecting"
      onChange={(e) => getIndividualKPI(e)}
      value={endprocess}
      style={{ width: "200px", height: "40px" }}
    >
      <option>Select...</option>
      {users &&
        users.length > 0 &&
        users
          .filter((item) => item.individuals === parseInt(endprocess))
          .map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
    </select>
  );

  return (
    <>
      <div>
        <select
          className="form-control selecting"
          onChange={(event) => handleChange(event)}
          style={{ width: "200px", height: "40px" }}
        >
          <option>Select...</option>
          {roles.map((role) => (
            <option key={role.role_id} value={role.role_id}>
              {role.role_name}
            </option>
          ))}
        </select>
      </div>
      <div>{process && <ProcessDropDown />}</div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {subProcess && <SubProcessDropDown />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {isDirector && <SubProcessList />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {subSubProcess && <SubSubProcessDropDown />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {isManager && <DisplaySubDeptManager />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {disManager && <DisplaySubSubDeptManager />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {isIndividual && <IndividualsDropDown />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {individual && <IndividualSubDropdown />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {isSubSubIndividual && <IndividualSubSubDropdown />}
      </div>
      <div className="form-group" style={{ marginBottom: "10px" }}>
        {isEnd && <IndividualDropdown />}
      </div>
    </>
  );
};

export default LandingPage;
