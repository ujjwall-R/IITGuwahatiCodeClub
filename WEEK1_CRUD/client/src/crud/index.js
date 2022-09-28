import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getTasks, createTask, removeTask } from "./api";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Form from "./Form";
import Loading from "./Loading";

const Crud = () => {
  //   console.log("crud called!");
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const allTask = await getTasks();
    setTasks(allTask.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createTask({ name: task })
      .then((res) => {
        setLoading(false);
        setTask("");
        toast.success(`${res.data.name} is created!`);
        loadTasks();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = (id, task) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      removeTask(id)
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          toast.error(`${task} deleted!!`);
          loadTasks();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h4 className="text-center">To Do List</h4>
              <Form handleSubmit={handleSubmit} task={task} setTask={setTask} />
              {tasks &&
                tasks.map((t) => {
                  return (
                    <div
                      className="border row mx-2 align-items-center"
                      key={t.id}
                    >
                      <ul className="list-group">
                        <li className="list-group-item">{t.name}</li>
                      </ul>
                      <span
                        onClick={() => {
                          handleRemove(t.id, t.name);
                        }}
                        className="btn btn-sm float-right"
                      >
                        <DeleteOutlined className="text-danger" />
                      </span>
                      <Link to={`/update/${t.id}`}>
                        <span
                          //   onClick={() => {}}
                          className="btn btn-sm float-right"
                        >
                          <EditOutlined className="text-warning" />
                        </span>
                      </Link>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Crud;
