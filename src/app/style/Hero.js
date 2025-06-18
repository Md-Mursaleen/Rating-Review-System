import styled from 'styled-components';

export const HeroSection = styled.div`
   max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    place-items: center;
    gap: 52px;
    margin-top: 80px;

    @media (max-width:768px) {
   grid-template-columns: 1fr 1fr;
    gap: 14px;
    padding: 8px;
    margin-top: 50px;
    }
   `