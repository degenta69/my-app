import React from "react";
import { Grid } from "@mui/material";
import MainWindowItem from "../components/Others/MainWindowItem";
import MainLayout from "../components/Layouts/MainLayout";
import CheckingAccount from "../components/Others/CheckingAccount";
import SalesInvoice from "../components/Others/SalesInvoice";
import CashFlow from "../components/Others/CashFlow";
import Watchlist from "../components/Others/Watchlist";

type Props = {};

const Main = (props: Props) => {
  return (
    <MainLayout>
      <Grid
        container
        spacing={2}
      >
        <Grid sm={12} md={6} item>
          <MainWindowItem
            utilityWrapperId="id-CheckingAccount-utility"
            title="Checking Account"
          >
            <CheckingAccount />
          </MainWindowItem>
        </Grid>
        <Grid sm={12} md={6} item>
          <MainWindowItem utilityWrapperId="id-SalesInvoice-utility" title="Invoices owed to you">
            <SalesInvoice />
          </MainWindowItem>
        </Grid>
        <Grid sm={12} md={6} item>
          <MainWindowItem utilityWrapperId="id-CashFlow-utility" title="Total cash flow">
            <CashFlow />
          </MainWindowItem>
        </Grid>
        <Grid sm={12} md={6} item>
          <MainWindowItem utilityWrapperId="id-Watchlist-utility" title="Account watchlist">
            <Watchlist />
          </MainWindowItem>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Main;
