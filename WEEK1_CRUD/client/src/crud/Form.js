import React from "react";
import { Input } from "antd";

const Form = ({ handleSubmit, task, setTask }) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <Input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        style={{ width: "50%" }}
        autoFocus
        required
      ></Input>
      <br />
      <button className="btn btn-primary mt-1">Submit</button>
      <button className="btn btn-danger mt-1" onClick={() => {}}>
        Cancel
      </button>
    </div>
  </form>
);

export default Form;
