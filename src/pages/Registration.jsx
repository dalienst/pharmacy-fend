import React from 'react'
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegistrationSchema } from "../validation/Registration";
import axios from "../api/axios";
import { urls, publicLinks } from "../constants/links";

export default function Registration() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center p-10 h-auto bg-gray-700">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={async (values) => {
          try {
            await axios.post(urls.REGISTER, values);
            toast.success("successfully registered");
            navigate(publicLinks.Login, { replace: true });
          } catch (error) {
            toast.error("registration failed");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-slate-300 rounded p-2 shadow px-4">
            <h1 className="text-white text-xl">Register</h1>
            <div className="text-white flex flex-col mb-2">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <Field
                name="username"
                className="rounded bg-white outline px-2"
              />
              {touched.username && errors.username && (
                <div className="my-1 text-xs text-red-700 italic">
                  {errors.username}
                </div>
              )}
            </div>
            <div className="text-white flex flex-col mb-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <Field name="email" className="rounded bg-white outline px-2" />
              {touched.email && errors.email && (
                <div className="my-1 text-xs text-red-700 italic">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="text-white flex flex-col mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="rounded bg-white outline px-2"
              />
              {touched.password && errors.password && (
                <div className="my-1 text-xs text-red-700 italic">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="text-white flex flex-col mb-2">
              <label htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="rounded bg-white outline px-2"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="my-1 text-xs text-red-700 italic">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="rounded shadow bg-blue-700 p-1 text-white hover:opacity-90 w-full"
            >
              Submit
            </button>
            <p className="text-white">
              <span className="text-xs">Already have an account?</span>{" "}
              <Link className="text-blue-700 italic underline" to="/login/">
                Sign in
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
