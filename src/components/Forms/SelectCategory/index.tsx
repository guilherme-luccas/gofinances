import React from "react";
import { Container, Category, Icon } from "./styles";

interface SelectProps {
  title: string;
  onPress: () => void;
}
export default function SelectCategory({ title, onPress }: SelectProps) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
