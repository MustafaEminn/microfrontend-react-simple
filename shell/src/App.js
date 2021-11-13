import React from "react";
import { CircularProgress, Grid, Stack } from "@mui/material";

const ProductApp = React.lazy(() => import("PRODUCT/App"));
const BasketApp = React.lazy(() => import("BASKET/App"));

const App = () => {
  const FallbackElement = () => {
    return (
      <Stack justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  };

  return (
    <Grid spacing={2} container>
      <Grid item xs={12} md={8}>
        <React.Suspense fallback={<FallbackElement />}>
          <ProductApp />
        </React.Suspense>
      </Grid>
      <Grid item xs={12} md={4}>
        <React.Suspense fallback={<FallbackElement />}>
          <BasketApp />
        </React.Suspense>
      </Grid>
    </Grid>
  );
};

export default App;
