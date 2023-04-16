import React, { useState } from "react";
import { Card, CardBody, Image, Center, Box, Heading, Text, Button } from "@chakra-ui/react";

const Product = ({ loading, product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <Center>
      <Card maxW="sm" mt={5} mx={5}>
          <CardBody>
            <Box>
              <Heading as="h2" mb={4}>
                {product.nombre}
              </Heading>
              <Image
                  src={product.imagen}
                  alt={product.nombre}
                  borderRadius="lg"
                />
              <Text mb={4}>{product.descripcion}</Text>
              <Text mb={4}>Precio: {product.precio}</Text>
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
                min={1}
              />
              <Button onClick={handleAddToCart}>Agregar al carrito</Button>
            </Box>
          </CardBody>
      </Card>
    </Center>
  );
};

export default Product;
