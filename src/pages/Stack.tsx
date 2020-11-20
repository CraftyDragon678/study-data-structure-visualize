import React, { useState } from "react";
import Element from "../components/Element";
import { ElementProps } from "../types/element";

export default () => {
  const [arr, setArr] = useState<ElementProps[]>([]);

  const add = () => {
    setArr([...arr, {
      val: Math.floor(Math.random() * 100).toString(),
      key: Math.floor(Math.random() * (16 ** 8 - 1)).toString(16),
      color: Math.floor(Math.random()*16777215).toString(16),
    }]);
  }

  return (
    <>
      {arr.map((v) => (
        <Element key={v.key} style={{ backgroundColor: `#${v.color}`}} >{v.val}</Element>
      ))}
      <button onClick={add}>+</button>
    </>
  );
};

