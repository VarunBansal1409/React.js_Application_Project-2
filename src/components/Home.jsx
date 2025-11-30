import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const Home = () => {
  let [seg, setSeg] = useState("");

  let [schema, setSchema] = useState([""]);

  let add = () => {
    setSchema([...schema, ""]);
  };

  let change = (e, index) => {
    let newSchema = [...schema];
    newSchema[index] = e.target.value;
    setSchema(newSchema);
  };

  let remove = (index) => {
    let deleted = schema.filter((_, i) => i !== index);
    setSchema(deleted);
  };

  let save = () => {
    let selectedschema = schema
      .filter((e) => e)
      .map((s) => ({ [s.toLowerCase().replace(" ", "_")]: s }));

    let payload = {
      segment_name: seg,
      schema: selectedschema,
    };

    axios.post("http://localhost:8080/segment", payload).then(() => {
      console.log("data created");
      window.location.reload();
      window.alert("✅ Segment Created Successfully");
    });
  };

  return (
    <>
      <button
        className="btn btn-outline-light seg"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Save Segment
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">
            <IoIosArrowBack className="icon" /> Saving Segment
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>Enter the Name of the Segment</p>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Name of the Segment"
            onChange={(e) => {
              setSeg(e.target.value);
            }}
          />
          <br />
          <p>
            To save your segment, you need to add the schemas to build the query
          </p>
          <br />
          {schema.map((value, index) => {
            let options = [
              "First Name",
              "Last Name",
              "Gender",
              "Age",
              "Account Name",
              "City",
              "State",
            ];

            return (
              <div id="drop" key={index}>
                <select
                  className="form-select data"
                  name="data"
                  value={value}
                  onChange={(e) => {
                    change(e, index);
                  }}
                >
                  <option value="" disabled hidden>
                    Add schema to segment
                  </option>
                  {options.map((opt) => {
                    if (schema.includes(opt) && opt !== value) {
                      return null;
                    } else {
                      return (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      );
                    }
                  })}
                </select>
                &nbsp;
                <button
                  className="btn btn-outline-info minus"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  <span className="icon1">__</span>
                </button>
              </div>
            );
          })}
          <br />
          <br />
          <button className="add" onClick={add}>
            + Add new schema
          </button>
          <div className="foot">
            <button className="btn btn-success" onClick={save}>
              Save the Segment
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
