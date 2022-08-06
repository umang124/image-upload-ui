import axios from "axios";
import React, { useEffect, useState } from "react";

const EmmployeeList = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
      axios.get('https://localhost:7282/api/EmployeeImage')
      .then((res) => {
        setEmployees(res.data)
      })
  }, [])

  const handleDelete = (e) => {
    axios.delete(`https://localhost:7282/api/EmployeeImage?id=${e}`)
      .then(() => {
        alert("Deleted")
      })
  }

  return (
    <div className="row" style={{ marginTop: "100px" }}>
      {
        employees.map((employee) => {
          return (
            <div className="card m-2" style={{ width: "18rem", marginTop: "10px" }} key={employee.id}>
              <img src={employee.imageSource} className="w-100 shadow-1-strong rounded mb-4" alt="..." />
              <div className="card-body">
                <button className="btn btn-danger" onClick={() => handleDelete(employee.id)}>Delete</button>
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default EmmployeeList;
