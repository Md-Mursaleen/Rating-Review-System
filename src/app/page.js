'use client'
import { useEffect, useState } from "react";
import Main from "./components/Main";
import { MainHeading } from "./style/Card";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([])   
  const [loading, setLoading] = useState(false)                 
  useEffect(() => {
    async function getData() {
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
      getData();
  }, []);
  return (
    <>
     {console.log("data", data)}
     <Main data={data} />
    </>
  );
}
