/* eslint-disable no-unused-vars */
import { Formik, Form, Field } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { privateLinks, urls } from '../constants/links';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Sidebar from '../layouts/Sidebar';

export default function UpdateProfile() {
    const navigate = useNavigate();
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
  return (
    <div className="main">
      <Sidebar />
      <div className="reg">
        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            contact: "",
            employee_number: "",
          }}
          onSubmit={async (values) => {
            const formData = new FormData();
            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append("contact", values.contact);
            formData.append("employee_number", values.employee_number);
            try {
              await axiosPrivate.patch(`employee/${auth?.user_id}/`, formData);
              // await axiosPrivate.post(urls.PROFILE, formData);
              toast.success("Profile Updated");
              navigate(privateLinks.Profile, { replace: true });
            } catch (error) {
              toast.error("Update Failed");
            }
          }}
        >
          {({ touched }) => (
            <Form className="profile-card">
              <h3 className="profile-title">Update Profile</h3>

              <div className="update-input-entry">
                <label htmlFor="first_name">First Name</label>
                <Field name="first_name" className="update-input-field" />
              </div>

              <div className="update-input-entry">
                <label htmlFor="last_name">Last Name</label>
                <Field name="last_name" className="update-input-field" />
              </div>

              <div className="update-input-entry">
                <label htmlFor="contact">Contact</label>
                <Field name="contact" className="update-input-field" />
              </div>

              <div className="update-input-entry">
                <label htmlFor="employee_number">Employee Number</label>
                <Field name="employee_number" className="update-input-field" />
              </div>

              <button type="submit" className="update-form-btn">
                Submit
              </button>

              <Link className="update-profile-link" to={privateLinks.Profile}>
                View Profile
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
