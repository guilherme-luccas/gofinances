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
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}
export default function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(item: Category) {
    setCategory(item);
  }
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
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <TitleCategory>{item.name} </TitleCategory>
          </Category>
        )}
      />
      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
