import React from "react";
import { Container, Category, Icon } from "./styles";

interface SelectProps {
  title: string;
}
export default function SelectCategory({ title }: SelectProps) {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
