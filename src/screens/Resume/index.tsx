import { View, Text } from "react-native";
import React from "react";
import { Container, Header, Title } from "./styles";
import HistoryCard from "../../components/HistoryCard";

export default function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard title="Compras" amount="R$ 150,00" color="red" />
    </Container>
  );
}
