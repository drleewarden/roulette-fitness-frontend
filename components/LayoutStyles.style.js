import styled, { css } from "styled-components";
// Create a Title component that'll render an <h1> tag with some styles
export const Cat = styled.h2`
  font-size: 3rem;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
export const Wrapper = styled.section`
  padding: 4em;
`;

export const InfoCardStyle = styled.article`
  padding: 4em;
  background-color: #e7cfcf;
  position: absolute;
  top: 40%;
  left: 3%;
  border-radius: 25px;
  box-shadow: 2px 0px 20px black;
`;
