import { useState } from "react";

export default function CarForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    // this line prevents the page from refreshing after submitting.
    event.preventDefault();

    // get the values from the form - convrting form data to objects
    // this formdata will map the form fields to the keys in the object
    // as result this name will be the key created in the database as per schema ex: make, model, image, description
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    console.log(formData);

    // use the api
    const response = await fetch("/api/cars", {
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    console.log(response);

    if (response.status == 201) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  var loadMsg = () => {
    if (status === "success") {
      return (
        <div className="alert alert-success">Car created successfully !</div>
      );
    } else if (status === "error") {
      return <div className="alert alert-danger">Error creating car !</div>;
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-6 mb-4">
            <label htmlFor="maker">Maker:</label>
            <input
              name="make"
              type="text"
              className="form-control"
              id="maker"
              placeholder="Enter make"
            />
          </div>

          <div className="form-group col-sm-6 mb-4">
            <label htmlFor="model">Model:</label>
            <input
              name="model"
              type="text"
              className="form-control"
              id="model"
              placeholder="Enter model"
            />
          </div>

          <div className="form-group col-sm-6 mb-4">
            <label htmlFor="imagelink">Image:</label>
            <input
              name="image"
              type="text"
              className="form-control"
              id="imagelink"
              placeholder="Enter Image URL"
            />
          </div>

          <div className="form-group col-sm-6 mb-4">
            <label htmlFor="decription">Description:</label>
            <input
              name="description"
              type="text"
              className="form-control"
              id="decription"
              placeholder="Enter Description"
            />
          </div>

          <button type="submit" className="btn btn-primary mb-4">
            Create CAR!
          </button>
        </div>
        {loadMsg()}
      </form>
    </div>
  );
}
