import { Formik, Form, Field } from "formik";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const DistroModal = ({ setIsOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Fill in to add distributor</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className="modalContent">
            <Formik
              initialValues={{
                company_name: "",
                license: "",
                location: "",
                contact: "",
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("company_name", values.company_name);
                formData.append("license", values.license);
                formData.append("location", values.location);
                formData.append("contact", values.contact);
                try {
                  await axiosPrivate.post(urls.DISTROS, formData);
                  toast.success("Distributor Added");
                  setIsOpen(false);
                } catch (error) {}
              }}
            >
              {({ touched }) => (
                <Form className="profile-card">
                  <div className="update-input-entry">
                    <label htmlFor="company_name">Name of Distributor</label>
                    <Field name="company_name" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="license">License of Distributor</label>
                    <Field name="license" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="location">Location of Distributor</label>
                    <Field name="location" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="contact">Contact of Distributor</label>
                    <Field name="contact" className="input-field" />
                  </div>

                  <button type="submit" className="update-form-btn">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* <div className="modalActions">
            <div className="actionsContainer">
              <button className="deleteBtn" type="submit">
                Add
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DistroModal;
