import styled, { css } from "styled-components";
// Create a Title component that'll render an <h1> tag with some styles
export const Cat = styled.h2`
  font-size: 3rem;
`;
// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.section`
  padding: 4em;
`;
export const Title1 = styled.h1`
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 100;
  line-height: 1.2;
  color: inherit;
`;

export const HeroTitle = styled.h1`
  margin: 15px;
  font-size: 4rem;
  font-weight: 100;
  font-family: "Montserrat", sans-serif;
  color: white;
`;

export const InfoCardStyle = styled.article`
  padding: 2rem;
  background-color: #e7cfcf;
  position: absolute;
  bottom: 2rem;
  max-width: 40%;
  left: 2rem;
  border-radius: 25px;
`;
