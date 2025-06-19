"use client";
import { Card, CardContent, CardHeading, ImageWrapper, PriceHeading, StarDiv } from "../style/Card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Products({ data }) {
  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/listings/${id}`);
  };

  return (
    <>
      {data.map((res) => (
        <Card key={res.id} onClick={() => handleClick(res.id)}>
          <ImageWrapper>
            <Image src={res.src} alt="img" fill />
          </ImageWrapper>
          <CardContent>
            <CardHeading>
              {res.name.length > 21 ? `${res.name.slice(0, 15)}...` : res.name}
            </CardHeading>
            <PriceHeading>
              <span style={{ fontFamily: "'Roboto', 'Segoe UI', 'Arial', sans-serif" }}>
                ₹ {res.price}
              </span>
            </PriceHeading>
            <StarDiv>
              {[...Array(5)].map((_, i) => (
                <span key={i}
                  style={{
                    color: i < Number(res.rating) ? "#ffc107" : "#e4e5e9",
                    fontSize: "1.5rem",
                  }}
                >
                  ★
                </span>
              ))}
            </StarDiv>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
