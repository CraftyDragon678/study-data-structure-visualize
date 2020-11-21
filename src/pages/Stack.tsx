import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import ColumnContainer from '../components/ColumnContainer';
import Element from '../components/Element';
import { ElementProps } from '../types/element';
import arrow from '../assets/arrow.svg';

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
  const [startWithZero, setStartWithZero] = useState(false);
  const [topPositon, setTopPosition] = useState(0);

  const push = () => {
    if (arr.length >= capacity) {
      Swal.fire('Error', 'Stack Full', 'error');
      return;
    }
    if (startWithZero) {
      pushItem();
      setTimeout(() => moveTop(arr.length + 1), +step * 1000);
    } else {
      moveTop(arr.length + 1);
      setTimeout(pushItem, +step * 1000);
    }
  };

  const pushItem = () => {
    if (arr.length >= capacity) {
      Swal.fire('Error', 'Stack Full', 'error');
      return;
    }
    setArr((arr) => [...arr, {
      val: Math.floor(Math.random() * 100).toString(),
      key: Math.floor(Math.random() * (16 ** 8 - 1)).toString(16),
      color: Math.floor(Math.random() * 16777215).toString(16),
    }]);
  };

  const pop = () => {
    if (arr.length <= 0) {
      Swal.fire('Error', 'Stack Empty', 'error');
      return;
    }
    if (startWithZero) {
      moveTop(arr.length - 1);
      setTimeout(() => setArr((arr) => arr.slice(0, -1)), +step * 1000);
    } else {
      setArr((arr) => arr.slice(0, -1));
      setTimeout(() => moveTop(arr.length - 1), +step * 1000);
    }
  };

  const moveTop = (size: number) => {
    setTopPosition((capacity - size - +startWithZero + 1) * 50 + 60);
  };

  const changeCapacity = (cap: string) => {
    if (Number.isNaN(+cap)) {
      return;
    }
    if (+cap < arr.length) {
      Swal.fire('Error', 'can\'t resize', 'error');
      return;
    }
    setCapacity(+cap);
  };

  useEffect(() => {
    moveTop(arr.length);
  }, [capacity, startWithZero]);

  return (
    <>
      <ControllerWrapper>
        <div>
          <label htmlFor="capacity">capacity: </label>
          <input id="capacity" type="number" value={capacity} onChange={(e) => changeCapacity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="step">step: </label>
          <input id="step" type="checkbox" checked={step} onChange={(e) => setStep(e.target.checked)} />
        </div>
        <div>
          <label htmlFor="start0">start from 0: </label>
          <input id="start0" type="checkbox" checked={startWithZero} onChange={(e) => setStartWithZero(e.target.checked)} />
        </div>
        <button type="button" onClick={push}>+</button>
        <button type="button" onClick={pop}>-</button>
      </ControllerWrapper>
      <StackWrapper>
        <StackIndex>
          {[...Array(capacity + +!startWithZero)].map((_, i) => (
            <div key={i}>{capacity - i - 1}</div>
          ))}
        </StackIndex>
        <StackContainer height={capacity}>
          {arr.map((v) => (
            <Element key={v.key} style={{ backgroundColor: `#${v.color}` }}>{v.val}</Element>
          ))}
        </StackContainer>
      </StackWrapper>
      <TopWrapper style={{ top: topPositon }}>
        <img alt="top" src={arrow} width={50} />
        <div>top</div>
      </TopWrapper>
    </>
  );
};
