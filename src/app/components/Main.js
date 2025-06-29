import { HeroSection } from "../style/Hero";
import Products from "./Products";

export default function Main({ data }) {

    return (
        <HeroSection>
            <Products data={data} />
        </HeroSection>
    );
}
