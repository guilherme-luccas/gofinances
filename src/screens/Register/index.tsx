import React, { useEffect, useState } from "react";
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Forms/Button";
import SelectCategory from "../../components/Forms/SelectCategory";
import CategorySelect from "../CategorySelect";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import InputForm from "../../components/Forms/InputForm";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import uuid from "react-native-uuid";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

interface FormData {
  name: string;
  amount: string;
}
const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um número")
    .required("Campo obrigatório")
    .positive("O Valor deve ser positivo"),
});

type NavigationProps = {
  navigate: (screen: string) => void;
};

export default function Register() {
  const navigation = useNavigation<NavigationProps>();

  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const [transactionType, setTransactionType] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const dataKey = "@gofinance:transactions";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }

  function handleCloseselectCategoty() {
    setCategoryModalOpen(false);
  }

  function handleOpenselectCategotyModal() {
    setCategoryModalOpen(true);
  }

  async function handleRegister(data: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação");
    }
    if (category.key === "category") {
      return Alert.alert("Selecione uma categoria");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: data.name,
      amount: data.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransaction];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType("");
      setCategory({ key: "category", name: "Categoria" });

      navigation.navigate("Listagem");
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível registrar a transação");
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await AsyncStorage.getItem(dataKey);

      const responseParsed = JSON.parse(response!);
      console.log(responseParsed);
    }
    getData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              autoCapitalize="sentences"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome"
              error={errors.name && errors.name.message}
            />
            <InputForm
              keyboardType="numeric"
              control={control}
              name="amount"
              placeholder="Preço"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </TransactionTypes>
            <SelectCategory
              title={category.name}
              onPress={handleOpenselectCategotyModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseselectCategoty}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
