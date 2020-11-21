import styled from '@emotion/styled';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Element from '../components/Element';
import arrow from '../assets/downarrow.svg';
import { ElementProps } from '../types/element';

const ControllerWrapper = styled.div`
  margin-bottom: 10px;
`;

const ElementWrapper = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Arrow = styled.img`
  height: 30px;
`;

export default () => {
  const [arr, setArr] = useState<ElementProps[]>([]);

  const push = () => {
    pushItem();
  };

  const pushItem = () => {
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
    setArr((arr) => arr.slice(0, -1));
  };

  return (
    <>
      <ControllerWrapper>
        {/* <div>
          <label>step: </label>
          <input type="checkbox" checked={step} onChange={(e) => setStep(e.target.checked)} />
        </div> */}
        <button type="button" onClick={push}>+</button>
        <button type="button" onClick={pop}>-</button>
      </ControllerWrapper>
      {arr.map((v) => (
        <ElementWrapper key={v.key}>
          <Element style={{ backgroundColor: `#${v.color}` }}>{v.val}</Element>
          <Arrow src={arrow} />
        </ElementWrapper>
      )).reverse()}
      <ElementWrapper>
        NULL
      </ElementWrapper>
    </>
  );
};
