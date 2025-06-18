import Image from "next/image";
import { Card, CardContent, CardHeading, ImageWrapper, PriceHeading } from "../style/Card";
import { HeroSection } from "../style/Hero";
import { FaStar, FaRegStar } from 'react-icons/fa'; 
import Products from "./Products";
import SingleProduct from "./SingleProduct";

export default function Main({data}) {
   
    return(
        <HeroSection>
           <Products data={data} />
        </HeroSection>
    )

}