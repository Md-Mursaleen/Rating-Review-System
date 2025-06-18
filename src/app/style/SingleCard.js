import styled from "styled-components";

export const OuterDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border-radius: 6px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
`;
export const StyledHr = styled.hr`
  margin: 40px 0;

  @media (max-width: 768px) {
    margin: 20px 0;
  }
`;

export const ReviewBox = styled.div`
  display: inline-block;
  width: 250px;
  margin-right: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  @media (max-width: 768px) {
   width: 180px;
   margin-right: 0.5rem;
   padding: 0.5rem;
  }
`;
