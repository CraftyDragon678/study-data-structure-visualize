import styled from "@emotion/styled";
import variables from "../styles/variables";

export default styled.div<{height: number}>`
  width: 150px;
  height: ${({ height }) => `${50 * height}px`};
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
