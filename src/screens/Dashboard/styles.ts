import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { DataListProps } from ".";

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.text};
  `,
  Header = styled.View`
    width: 100%;
    height: ${RFPercentage(42)}px;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
  `,
  UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
  `,
  Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
  `,
  User = styled.View`
    margin-left: ${RFValue(10)}px;
  `,
  UserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
  `,
  UserName = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
  `,
  Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
  `;
export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 },
  })`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
  `,
  Transactions = styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(12)}px;
  `,
  Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: 16px;
  `,
  TransactionsList = styled(
    FlatList as new (
      props: FlatListProps<DataListProps>
    ) => FlatList<DataListProps>
  ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { paddingBottom: getBottomSpace() },
  })``;
