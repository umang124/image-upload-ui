import axios from "axios";
import React, { useState } from "react";

const Employee = () => {
  const defaultImageSource = "/img/R_image.png";

  const initialValues = {
    imageName: "",
    imageSource: defaultImageSource,
    imageFile: null,
  };

  const [values, setValues] = useState(initialValues);

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      var imageFile = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (x) => {
        setValues({ ...values, imageFile, imageSource: x.target.result });
      };

      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSource: defaultImageSource,
      });
    }
    console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    //formData.append('Image', values.imageName);
    formData.append("ImageFile", values.imageFile);

    axios
      .post("https://localhost:7282/api/EmployeeImage", formData)
      .then(() => {
        alert("Done");
        setValues(initialValues);
        document.getElementById("image-uploader").value = null;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="card text-center m-auto" style={{ width: "20rem" }}>
        <h5 className="text-center mt-3 pb-3 border-bottom">
          Add Employee Image
        </h5>
        <img src={values.imageSource} className="card-img-top" alt="" />
        <div className="form-group ">
          <input
            type="file"
            accept="image/*"
            className="form-control-file mb-3 ms-4"
            onChange={showPreview}
            id="image-uploader"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Employee;
