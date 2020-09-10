import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  position: relative;
  padding-bottom: calc(48px + 1rem);

  button {
    position: absolute;
    bottom: 0;
  }

  @media (max-width: 480px) {
    & {
      grid-template-columns: repeat(auto-fit, minmax(100vw, 1fr));
    }
  }
`;
