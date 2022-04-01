import React from "react";
import { TouchableOpacity } from "react-native";
import HighLightCard from "../../components/HighlightCard";
import TrasactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";
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
  Transactions,
  Title,
  TransactionsList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "12.000,00",
      category: {
        name: "Vendas",
        icon: "dollar-sign",
      },
      date: "12/04/2022",
    },
    {
      id: "2",
      type: "negative",
      title: "Desenvolvimento de site",
      amount: "2.000,00",
      category: {
        name: "Vendas",
        icon: "coffee",
      },
      date: "12/04/2022",
    },
    {
      id: "3",
      type: "negative",
      title: "Desenvolvimento de site",
      amount: "2.000,00",
      category: {
        name: "Vendas",
        icon: "shopping-bag",
      },
      date: "12/04/2022",
    },
  ];
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
          <TouchableOpacity onPress={() => {}}>
            <Icon name="power" />
          </TouchableOpacity>
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
      <Transactions>
        <Title>Listagem</Title>
        <TransactionsList
          data={data}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: any) => <TrasactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
