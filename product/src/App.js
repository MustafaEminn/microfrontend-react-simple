import React, { useState } from "react";
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
  const [products, setProducts] = useState(["Banana", "Apple", "Orange"]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    setProducts([...products, formProps.productName]);
  };

  const onAddToBasket = (product) => {
    BA.then((funcs) => {
      funcs.default.emit("addToBasketProduct", null, product);
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product Server
      </Typography>

      <form onSubmit={(e) => handleAddProduct(e)}>
        <Stack direction="row" spacing={1}>
          <TextField
            name="productName"
            fullWidth
            size="small"
            label="Add new product"
            variant="outlined"
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Stack>
      </form>
      <Box marginTop="0.8rem" />
      <Stack spacing={1}>
        {products.map((product, index) => (
          <>
            <Card key={index}>
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
                      onClick={() => {
                        onAddToBasket(product);
                      }}
                      fullWidth
                      variant="contained"
                      color="secondary"
                    >
                      Add To Basket
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
