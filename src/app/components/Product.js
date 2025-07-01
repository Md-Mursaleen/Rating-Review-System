import { useEffect, useState } from "react";
import { CardContent, CardHeading, ImageWrapper, PriceHeading, StarDiv } from "../style/Card";
import { Button, OuterDiv, ReviewBox, StyledHr } from "../style/SingleCard";
import Image from "next/image";
import axios from "axios";

export default function Product({ id, data }) {
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      const res = await axios.get(`http://localhost:8080/reviews/${id}`);
      const data = res.data;
      setReviews(data);
    };

    getReviews();
  }, [id, submitted]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    const urls = files.map(file => URL.createObjectURL(file));
    setPhotoURLs(urls);
  };

  useEffect(() => {
    return () => {
      photoURLs.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photoURLs]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const alreadyReviewed = reviews.some(
      (rev) => rev.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (alreadyReviewed) {
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating);
    formData.append('review', review);
    formData.append('id', id);
    photos.forEach(photo => {
      formData.append('photos', photo);
    });

    const res = await fetch("http://localhost:8080/review-submitted", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("data", data);

    if (res.ok) {
      setName("");
      setRating(0);
      setReview("");
      setPhotos([]);
      setPhotoURLs([]);
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
            <Image src={data.src} alt="img" fill />
          </ImageWrapper>
          <CardContent className="single-pro-content">
            <CardHeading className="single-pro-heading">
              {data.name}
            </CardHeading>
            <PriceHeading className="single-pro-price">
              <span style={{ fontFamily: "'Roboto', 'Segoe UI', 'Arial', sans-serif" }}>
                ₹ {data.price}
              </span>
            </PriceHeading>
            <StarDiv>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ fontSize: "1.5rem", color: i < Number(data.rating) ? "#ffc107" : "#e4e5e9" }}>
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
            boxSizing: "border-box",
          }}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{
            width: "100%",
            padding: "0.8rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
          }}
        />
        {photoURLs.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "1rem", gap: "10px" }}>
            {photoURLs.map((src, idx) => (
              <div key={idx} style={{ position: "relative", width: "100px", height: "100px" }}>
                <img
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px", border: "1px solid #ccc" }}
                />
              </div>
            ))}
          </div>
        )}
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
            boxSizing: "border-box",
          }}
        />
        <br />

        <Button type="submit">Submit Review</Button>
      </form>

      {showModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.4)",
          zIndex: 1000
        }}>
          <div style={{
            padding: "2rem",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            textAlign: "center"
          }}>
            <h3 style={{ marginBottom: "1rem" }}>You have already reviewed this product.</h3>
            <button onClick={() => setShowModal(false)} style={{
              padding: "0.5rem 1.5rem",
              background: "#ffc107",
              fontWeight: "bold",
              color: "#222",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}>OK</button>
          </div>
        </div>
      )}

      {submitted && (
        <p style={{ color: "green", marginTop: "10px" }}>
          ✅ Review submitted successfully!
        </p>
      )}

      {reviews?.length > 0 && (
        <>
          <StyledHr />
          <div style={{ padding: "1rem 0", overflowX: "auto", whiteSpace: "nowrap" }}>
            {reviews.map((rev, idx) => (
              <ReviewBox key={idx}>
                <h4 style={{ marginBottom: "0.5rem" }}>{rev.name}</h4>
                <div style={{ marginBottom: "0.5rem", color: "#ffc107" }}>
                  {Array.from({ length: rev.rating }, (_, i) => (
                    <span key={i}>★</span>
                  ))}
                  {Array.from({ length: 5 - rev.rating }, (_, i) => (
                    <span key={i}>☆</span>
                  ))}
                </div>
                <p style={{ fontStyle: "italic" }}>{rev.review}</p>
                {rev.photos && rev.photos.length > 0 && (
                  <div style={{
                    display: "flex",
                    marginTop: "1rem",
                    overflowX: "auto",
                    gap: "10px",
                  }}>
                    {rev.photos.map((photo, photoIdx) => (
                      <div key={photoIdx} style={{ position: "relative", width: "100px", height: "100px" }}>
                        <Image
                          src={`http://localhost:8080/${photo}`}
                          alt={`Review photo ${photoIdx + 1}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <small>{new Date(rev.createdAt).toLocaleDateString()}</small>
              </ReviewBox>
            ))}
          </div>
        </>
      )}
    </OuterDiv>
  );
}
