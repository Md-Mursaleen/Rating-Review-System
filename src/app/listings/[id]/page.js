"use client";
import { use, useEffect, useState } from "react";
import Product from "@/app/components/Product";
import axios from "axios";

const ProductPage = ({ params }) => {
  const { id } = use(params);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getProductDataById() {
      try {
        let res = await axios.get(`/api/product/${id}`);
        res = res.data;
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getProductDataById();
  }, [id]);

  return <Product id={data.id} data={data} />;
};

export default ProductPage;
