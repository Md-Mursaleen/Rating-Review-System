import styled from 'styled-components';

export const Card = styled.div`
  height: 320px;
  min-height: 320px;
  width: 100%;    
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  gap: 10px;
  border: 1px solid rgba(192, 192, 192, 0.32);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    cursor: pointer;
  }
`;
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  flex-shrink: 0;
  img {
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
  }
`;

export const CardContent = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const CardHeading = styled.h2`
  margin:0;
  padding:0;
  font-size: 22px;
`;
export const PriceHeading = styled(CardHeading)`
 font-size: 24px;
`;

export const StarDiv = styled.div`

`;
