'use client'
import SingleProduct from "@/app/components/SingleProduct";
import axios from "axios";
import { use, useEffect, useState } from "react";

const SingleProductPage = ({ params }) => {
    const { id } = use(params); 
    console.log("iddddd", id);
    const[data, setData] = useState([]);

       useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get(`/api/single-product/${id}`);
        res = res.data;
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    }
      getData();
   }, [id]);

  return <SingleProduct id={data.id} data = {data} />;
};

export default SingleProductPage;
