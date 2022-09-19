/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Formik, Form, Field } from "formik";
import React, { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProductsModalDisplay = ({ setOpen, product }) => {
  const axiosPrivate = useAxiosPrivate();
  console.log(product?.item_name);

  return (
    <>
      <div className="darkBG" onClick={() => setOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Update the Product</h5>
          </div>
          <button className="closeBtn" onClick={() => setOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>

          <div className="modalContent">
            <Formik
              initialValues={{
                item_name: product?.item_name,
                item_description: product?.item_description,
                item_type: product?.item_type,
                quantity_in: product?.quantity_in,
                item_code: product?.item_code,
                item_price: product?.item_price,
                expiry: product?.expiry,
                distributor: product?.distributor,
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
                  await axiosPrivate.patch(`inventory/product/${product.id}/`);
                  toast.success("Product Updated");
                  setOpen(false);
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
                    <label htmlFor="item_description">
                      Description of Product
                    </label>
                    <Field name="item_description" className="input-field" />
                  </div>

                  <div className="update-input-entry">
                    <label htmlFor="item_type">
                      Type of Product: Tablets or Syrup
                    </label>
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
        </div>
      </div>
    </>
  );
};

export default ProductsModalDisplay;
