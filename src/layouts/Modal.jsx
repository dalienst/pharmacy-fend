import { Formik, Form, Field } from "formik";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Modal = ({ setIsOpen }) => {
  const axiosPrivate = useAxiosPrivate();
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Fill in to add products</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className="modalContent">
            <Formik
              initialValues={{
                item_name: "",
                item_description: "",
                item_type: "",
                quantity_in: "",
                item_code: "",
                item_price: "",
                expiry: "",
                distributor: "",
              }}
              onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("item_name", values.item_name);
                formData.append("item_description", values.item_description);
                formData.append("item_type", values.item_type);
                formData.append("item_code", values.item_code);
                formData.append("quantity_in", values.quantity_in);
                formData.append("item_price", values.item_price);
                formData.append("expiry", values.expiry);
                formData.append("distributor", values.distributor);
                try {
                  await axiosPrivate.post(urls.PRODUCTS, formData);
                  toast.success("Product Added");
                  setIsOpen(false);
                } catch (error) {}
              }}
            >
              {({ touched }) => (
                <Form className="profile-card">
                  <div className="update-input-entry">
                    <label htmlFor="item_name">Name of Product</label>
                    <Field name="item_name" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="item_description">Description of Product</label>
                    <Field name="item_description" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="item_type">Type of Product: Tablets or Syrup</label>
                    <Field name="item_type" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="item_code">Product Code</label>
                    <Field name="item_code" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="quantity_in">Quantity of Product</label>
                    <Field name="quantity_in" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="item_price">Price of Product</label>
                    <Field name="item_price" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="expiry">Expiry Date: yyyy-mm-dd</label>
                    <Field name="expiry" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="distributor">Supplier of Product</label>
                    <Field name="distributor" className="input-field" />
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

export default Modal;
