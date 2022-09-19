/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductsModalDisplay from "../layouts/ProductsModalDisplay";
import {
  RiDeleteBin5Fill,
  RiExternalLinkFill,
  RiRefreshFill,
} from "react-icons/ri";

const ProductDetail = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inOpen, setOpen] = useState(false);
  const getProduct = async () => {
    try {
      const response = await axiosPrivate.get(`inventory/product/${id}/`);
      setProductData(() => {
        return response.data;
      });
    //   console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div>This products id is: {productData?.item_name}</div>

      <button onClick={() => setOpen(true)}>
        <RiRefreshFill />
      </button>
      {inOpen && (
        <ProductsModalDisplay setOpen={setOpen} product={productData} />
      )}
    </>
  );
};

export default ProductDetail;
