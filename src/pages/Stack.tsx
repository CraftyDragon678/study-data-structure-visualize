import styled from "@emotion/styled";
import React, { createRef, useRef, useState } from "react";
import Swal from "sweetalert2";
import ColumnContainer from "../components/ColumnContainer";
import Element from "../components/Element";
import { ElementProps } from "../types/element";
import arrow from "../assets/arrow.svg";

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

const TopWrapper = styled.div`
  width: 100px;
  height: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 15px;

  position: absolute;
  left: 200px;
  top: 0;
  transition: 100ms top ease;
`;

export default () => {
  const [capacity, setCapacity] = useState(10);
  const [arr, setArr] = useState<ElementProps[]>([]);
  const [step, setStep] = useState(false);

  const push = () => {
    if (arr.length >= capacity) {
      Swal.fire('Error', 'Stack Full', 'error');
      return;
    }
    if (step) setTimeout(pushItem, 2000);
    else pushItem();
  }

  const pushItem = () => {
    setArr((arr) => [...arr, {
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
    if (step) setTimeout(popItem, 2000);
    else popItem();
  }

  const popItem = () => {
    setArr((arr) => arr.slice(0, -1));
  }

  const moveTop = () => {

  }

  return (
    <>
      <ControllerWrapper>
        <div>
          <label>capacity: </label>
          <input type="number" value={capacity} onChange={(e) => !isNaN(+e.target.value) && setCapacity(+e.target.value)} />
        </div>
        <div>
          <label>step: </label>
          <input type="checkbox" checked={step} onChange={(e) => setStep(e.target.checked) } />
        </div>
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
      <TopWrapper style={{ top: (capacity - arr.length) * 50 + 90 }}>
        <img src={arrow} width={50} />
        <div>top</div>
      </TopWrapper>
    </>
  );
};

