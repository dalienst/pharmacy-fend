import { Formik, Form, Field } from "formik";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const OrderModal = ({setIsOpen}) => {
    const axiosPrivate = useAxiosPrivate();
    return (
      <>
        <div className="darkBG" onClick={() => setIsOpen(false)} />
        <div className="centered">
          <div className="modal">
            <div className="modalHeader">
              <h5 className="heading">Make an order</h5>
            </div>
            <button className="closeBtn" onClick={() => setIsOpen(false)}>
              <RiCloseLine style={{ marginBottom: "-3px" }} />
            </button>

            <div className="modalContent">
              <Formik
                initialValues={{
                  product: "",
                  customer_name: "",
                  product_quantity: "",
                }}
                onSubmit={async (values) => {
                  const formData = new FormData();
                  formData.append("product", values.product);
                  formData.append("customer_name", values.customer_name);
                  formData.append("product_quantity", values.product_quantity);
                  try {
                    await axiosPrivate.post(urls.ORDERS, formData);
                    toast.success("Order Created");
                    setIsOpen(false);
                  } catch (error) {}
                }}
              >
                {({ touched }) => (
                  <Form className="profile-card">
                    <div className="update-input-entry">
                      <label htmlFor="product">Code of Product</label>
                      <Field name="product" className="input-field" />
                    </div>

                    <div className="update-input-entry">
                      <label htmlFor="customer_name">Name of Customer</label>
                      <Field name="customer_name" className="input-field" />
                    </div>

                    <div className="update-input-entry">
                      <label htmlFor="product_quantity">Quantity Bought</label>
                      <Field name="product_quantity" className="input-field" />
                    </div>

                    <button type="submit" className="update-form-btn">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
    );
};

export default OrderModal;