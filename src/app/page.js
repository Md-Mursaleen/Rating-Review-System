"use client";
import { useState, useEffect } from "react";
import Main from "./components/Main";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProductsData() {
      setLoading(true);
      try {
        let res = await axios.get(`/api/products`);
        res = res.data;
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    getProductsData();
  }, []);

  return (
    <>
      <Main data={data} />
    </>
  );
}
