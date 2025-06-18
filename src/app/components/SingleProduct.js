import Image from "next/image";
import {
  CardContent,
  CardHeading,
  ImageWrapper,
  PriceHeading,
  StarDiv,
} from "../style/Card";
import { Button, OuterDiv, ReviewBox, StyledHr } from "../style/SingleCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SingleProduct({ id, data }) {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  useEffect(() => {
    if (!id) return;
    const getReviews = async () => {
       console.log("id in single product functoon", id);
      const res = await axios.get(`http://localhost:8080/reviews/${id}`);
      const data = res.data;
      console.log("ress in sin", data);
      setReviews(data);
    };

    getReviews();
  }, [id, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/review-submitted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rating,
        review,
        id,
      }),
    });

    const data = await res.json();
    console.log("data", data);

    if (res.ok) {
      setName("");
      setRating(0);
      setReview("");
      setSubmitted(true);
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <OuterDiv>
      {data && typeof data === 'object' && Object.keys(data).length > 0 && (
        <>
      <ImageWrapper>
        <Image
          src={data.src}
          alt="img"
          fill
        />
      </ImageWrapper>
      <CardContent className="single-pro-content">
        <CardHeading className="single-pro-heading">
          {data.name}
        </CardHeading>
        <PriceHeading className="single-pro-price">
          <span
            style={{ fontFamily: "'Roboto', 'Segoe UI', 'Arial', sans-serif" }}
          >
            ₹ {data.price}
          </span>
        </PriceHeading>
        <StarDiv>
           {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < Number(data.rating) ? "#ffc107" : "#e4e5e9",
                    fontSize: "1.5rem",
                  }}
                >
                  ★
                </span>
              ))}
        </StarDiv>
      </CardContent>
      </>
      )}

       <StyledHr />

      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxSizing: "border-box"
          }}
        />
        <div style={{ marginBottom: "1rem" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                fontSize: "2rem",
                color: star <= (hover || rating) ? "#ffc107" : "rgb(165 167 174)",
                cursor: "pointer",
              }}
              required
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows="5"
          placeholder="Write your experience here..."
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "vertical",
            boxSizing: "border-box"
          }}
        />
        <br />

        <Button type="submit">Submit Review</Button>
      </form>

      {submitted && (
        <p style={{ color: "green", marginTop: "10px" }}>
          ✅ Review submitted successfully!
        </p>
      )}
      

     {reviews?.length > 0 && (
        <>
        <StyledHr />
        <div
        style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "1rem 0" }}
      >
        {reviews.map((rev, idx) => (
          <ReviewBox
            key={idx}
          >
            <h4 style={{ marginBottom: "0.5rem" }}>{rev.name}</h4>
            <div style={{ color: "#ffc107", marginBottom: "0.5rem" }}>
              {Array.from({ length: rev.rating }, (_, i) => (
                <span key={i}>★</span>
              ))}
              {Array.from({ length: 5 - rev.rating }, (_, i) => (
                <span key={i}>☆</span>
              ))}
            </div>
            <p style={{ fontStyle: "italic" }}>{rev.review}</p>
            <small>{new Date(rev.createdAt).toLocaleDateString()}</small>
          </ReviewBox>
        ))}
      </div>
      </>
     )}
     
    </OuterDiv>
  );
}
