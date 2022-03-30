import React, { useState } from "react";
import Button from "../../components/Forms/Button";
import Input from "../../components/Forms/Input";
import SelectCategory from "../../components/Forms/SelectCategory";
import CategorySelect from "../CategorySelect";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";

import { Modal } from "react-native";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

export default function Register() {
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }

  function handleCloseselectCategoty() {
    setCategoryModalOpen(false);
  }

  function handleOpenselectCategotyModal() {
    setCategoryModalOpen(true);
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TransactionTypes>
          <SelectCategory
            title={category.name}
            onPress={handleOpenselectCategotyModal}
          />
        </Fields>
        <Button title="Enviar" />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseselectCategoty}
        />
      </Modal>
    </Container>
  );
}
