import React from "react";
import HighLightCard from "../../components/HighlightCard";
import {
  Container,
  Header,
  HighLightCards,
  Icon,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/63374442?s=96&v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Guilherme</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighLightCards>
        <HighLightCard
          type="up"
          title="Entradas"
          amount={"R$ 10.00,00"}
          lastTransaction="Última entrada dia 14 de abril"
        />
        <HighLightCard
          type="down"
          title="Saídas"
          amount={"-R$ 5.000,00"}
          lastTransaction="Última saída dia 14 de abril"
        />
        <HighLightCard
          type="total"
          title="Total"
          amount={"R$ 5.000,00"}
          lastTransaction="01 à de 16 de abril"
        />
      </HighLightCards>
    </Container>
  );
}
