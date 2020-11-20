import styled from "@emotion/styled";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ColumnContainer from "../components/ColumnContainer";
import Element from "../components/Element";
import { ElementProps } from "../types/element";

const StackContainer = styled(ColumnContainer)`
  flex-direction: column-reverse;
`;

export default () => {
  const [capacity, setCapacity] = useState(0);
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
      <label>capacity: </label>
      <input type="number" value={capacity} onChange={(e) => !isNaN(+e.target.value) && setCapacity(+e.target.value)} />
      <button onClick={push}>+</button>
      <button onClick={pop}>-</button>
      <StackContainer height={capacity}>
        {arr.map((v) => (
          <Element key={v.key} style={{ backgroundColor: `#${v.color}`}} >{v.val}</Element>
        ))}
      </StackContainer>
    </>
  );
};

