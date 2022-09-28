import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTask, updateTask } from "./api";
import Loading from "./Loading";
import Form from "./Form";

const Update = ({ history, match }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadTask();
  }, []);
  const loadTask = () => {
    getTask(match.params.id).then((d) => setTask(d.data.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateTask(match.params.id, { name: task })
      .then((res) => {
        setLoading(false);
        setTask("");
        toast.success(`${res.data.name} is updated`);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? <Loading /> : <h4>Update Name</h4>}
          <Form handleSubmit={handleSubmit} task={task} setTask={setTask} />
        </div>
      </div>
    </div>
  );
};

export default Update;
