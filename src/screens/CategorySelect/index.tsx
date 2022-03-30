import React from "react";
import Button from "../../components/Forms/Button";
import { categories } from "../../utils/categories";
import {
  Container,
  Header,
  List,
  Title,
  Category,
  Icon,
  TitleCategory,
  Separator,
  Footer,
  ButtonText,
} from "./styles";

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: string;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}
export default function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <List
        data={categories}
        keyExtractor={(item: any) => item.key}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }: any) => (
          <Category>
            <Icon name={item.icon} />
            <TitleCategory>{item.name} </TitleCategory>
          </Category>
        )}
      />
      <Footer>
        <Button title="Selecionar" />
      </Footer>
    </Container>
  );
}
