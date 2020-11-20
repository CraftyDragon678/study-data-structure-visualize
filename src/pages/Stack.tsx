import styled from "@emotion/styled";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ColumnContainer from "../components/ColumnContainer";
import Element from "../components/Element";
import { ElementProps } from "../types/element";

const StackWrapper = styled.div`
  display: flex;
`;

const StackIndex = styled.div`
  display: grid;
  width: 30px;
  div {
    height: 50px;
    display: grid;
    place-items: center;
  }
`;

const StackContainer = styled(ColumnContainer)`
  flex-direction: column-reverse;
`;

const ControllerWrapper = styled.div`
  margin-bottom: 10px;
`;

export default () => {
  const [capacity, setCapacity] = useState(10);
  const [arr, setArr] = useState<ElementProps[]>([]);

  const push = () => {
    if (arr.length >= capacity) {
      Swal.fire('Error', 'Stack Full', 'error');
      return;
    }
    setArr([...arr, {
      val: Math.floor(Math.random() * 100).toString(),
      key: Math.floor(Math.random() * (16 ** 8 - 1)).toString(16),
      color: Math.floor(Math.random()*16777215).toString(16),
    }]);
  }

  const pop = () => {
    if (arr.length <= 0) {
      Swal.fire('Error', 'Stack Empty', 'error');
      return;
    }
    setArr(arr.slice(0, -1));
  }

  return (
    <>
      <ControllerWrapper>
        <label>capacity: </label>
        <input type="number" value={capacity} onChange={(e) => !isNaN(+e.target.value) && setCapacity(+e.target.value)} />
        <button onClick={push}>+</button>
        <button onClick={pop}>-</button>
      </ControllerWrapper>
      <StackWrapper>
        <StackIndex>
          {[...Array(capacity + 1)].map((_, i) => (
            <div key={i}>{capacity - i - 1}</div>
          ))}
        </StackIndex>
        <StackContainer height={capacity}>
          {arr.map((v) => (
            <Element key={v.key} style={{ backgroundColor: `#${v.color}`}} >{v.val}</Element>
          ))}
        </StackContainer>
      </StackWrapper>
    </>
  );
};

