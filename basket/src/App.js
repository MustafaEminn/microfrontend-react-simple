import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
const BA = import("SHELL/EventBus");

const App = () => {
  const [products, setProducts] = useState([]);

  const onRemoveFromBasket = (index) => {
    let newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  useEffect(() => {
    BA.then((funcs) => {
      funcs.default.on("addToBasketProduct", (product) => {
        if (typeof product === "string") {
          setProducts((prevState) => [...prevState, product]);
        }
      });
    });

    return () => {
      BA.then((funcs) => {
        funcs.default.die("addToBasketProduct");
      });
    };
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Basket Server
      </Typography>
      <Stack spacing={1}>
        {products.map((product, index) => (
          <>
            <Card>
              <CardContent>
                <Grid container direction="row" justifyContent="space-between">
                  <Grid item xs={12} md={9}>
                    <Typography
                      overflow="hidden"
                      textOverflow="ellipsis"
                      width="100%"
                      variant="h6"
                      key={index}
                    >
                      {product}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Button
                      onClick={() => onRemoveFromBasket(index)}
                      fullWidth
                      variant="contained"
                      color="error"
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Box marginTop="0.8rem" />
          </>
        ))}
      </Stack>
    </div>
  );
};

export default App;
