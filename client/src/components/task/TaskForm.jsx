import React from "react";
import "./TaskForm.scss";

import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

// Redux Imports
import { useDispatch } from "react-redux";
import { setResults } from "../../features/search/searchSlice";

function TaskForm({ status, setStatus }) {
  // Redux Functions
  const dispatch = useDispatch();

  // Form Submit Handler Function
  const handleSubmit = async (values, { resetForm }) => {
    try {
      setStatus("In Progress...");
      if (values.searchCondition === "users") {
        const res = await axios.get(
          `https://api.github.com/search/users?q=${values.search}`
        );

        dispatch(setResults(res.data.items));
        setStatus("Success");
      } else if (values.searchCondition === "organizations") {
        const res = await axios.get(
          `https://api.github.com/search/users?q=${values.search}+type:org`
        );

        dispatch(setResults(res.data.items));
        setStatus("Success");
      }

      // Clear Fields After Form Submission
      resetForm({ values: "" });
    } catch (error) {
      console.log(error);
      setStatus("No Results Found");
    }
  };

  return (
    <Formik
      initialValues={{ searchCondition: "users", search: "" }}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="task-form">
          <div className="task-form__radio-container">
            <Field type="radio" name="searchCondition" value="users" />
            <label htmlFor="searchCondition">Users</label>
            <Field type="radio" name="searchCondition" value="organizations" />
            <label htmlFor="searchCondition">Organizations</label>
          </div>
          <div className="task-form__search-container">
            <Field
              type="search"
              name="search"
              placeholder={
                values.searchCondition === "users"
                  ? "Search Users"
                  : "Search Organizations"
              }
            />
            <button type="submit">Search</button>
          </div>
          <p className="task-form__status">
            Status: <span>{status}</span>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default TaskForm;
