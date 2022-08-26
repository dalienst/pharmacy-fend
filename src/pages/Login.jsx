import React from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { urls, publicLinks } from "../constants/links";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="reg">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            await axios.post(urls.LOGIN, values);
            toast.success("successfully logged in");
            navigate(publicLinks.Dashboard, { replace: true });
          } catch (error) {
            toast.error("login failed");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="reg-form">
            <h2 className="form-title">Login</h2>
            <div className="input-entry">
              <label htmlFor="email">Email</label>
              <Field name="email" className="input-field" />
              {touched.email && errors.email && (
                <div className="input-error">{errors.email}</div>
              )}
            </div>

            <div className="input-entry">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" className="input-field" />
              {touched.password && errors.password && (
                <div className="input-error">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="form-btn">
              Submit
            </button>

            <p className="input-link">
              <span>Already have an account?</span>{" "}
              <Link to="/register" className="input-redirect">
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
