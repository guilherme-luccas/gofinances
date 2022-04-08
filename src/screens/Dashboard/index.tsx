import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import HighLightCard from "../../components/HighlightCard";
import TrasactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
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
  LoadContainer,
} from "./styles";
import theme from "../../global/styles/theme";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightData {
  entries: {
    amount: string;
  };
  expenses: {
    amount: string;
  };
  total: {
    amount: string;
  };
}

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setDate] = useState<DataListProps[]>();
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  );

  const theme = useTheme();
  const dataKey = "@gofinance:transactions";

  async function getData() {
    const transactions = await AsyncStorage.getItem(dataKey);

    const transactionsParsed = transactions ? JSON.parse(transactions!) : [];

    let entries = 0;
    let expenses = 0;

    const transsationFormatted: DataListProps[] = transactionsParsed.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entries += Number(item.amount);
        } else {
          expenses += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );
    setDate(transsationFormatted);

    
    


    const total = entries - expenses;
    setHighLightData({
      entries: {
        amount: entries.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      expenses: {
        amount: expenses.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      },
    });
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <Container>
      {loading ? (
        <LoadContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadContainer>
      ) : (
        <>
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
              amount={highLightData?.entries?.amount}
              lastTransaction="Última entrada dia 14 de abril"
            />
            <HighLightCard
              type="down"
              title="Saídas"
              amount={highLightData?.expenses?.amount}
              lastTransaction="Última saída dia 14 de abril"
            />
            <HighLightCard
              type="total"
              title="Total"
              amount={highLightData?.total?.amount}
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
        </>
      )}
    </Container>
  );
}
