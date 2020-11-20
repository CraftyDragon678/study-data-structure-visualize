import React from "react";
import { text } from "@storybook/addon-knobs";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Simple = () => {
  const content = text("content", "button!");
  return <Button>{content}</Button>;
};
