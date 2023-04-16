import { Center, Divider, SimpleGrid, Spinner, Stat, StatLabel, StatNumber, Text, Box } from "@chakra-ui/react";
import React from "react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";

const Grid = ({
  products,
  loading,
  getProduct,
  deleteProduct,
  addToCart,
  removeFromCart,
  totalPrice,
  isCartEmpty,
}) => {
  const path = useLocation().pathname;
  return (
    <>
    <Center>
    <SimpleGrid columns={1} spacing={10}>
        {loading && (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
        </SimpleGrid>
        </Center>
        <Center>
        <SimpleGrid columns={3} spacing={10}>
        {products &&
          products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                imagen={product.imagen}
                nombre={product.nombre}
                precio={product.precio}
                descripcionCorta={product.descripcionCorta}
                type={product.type}
                quantity={product.quantity}
                getProduct={getProduct}
                deleteProduct={deleteProduct}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            );
          })}
          </SimpleGrid>
          </Center>
          <Center mt='20'>
          {path === "/cart" ? (
          isCartEmpty ? (
           
              <Text fontSize='5xl'>
                El carrito está vacío.
              </Text>
           
          ) : (
            <>
           
              
                <Stat>
                  <StatLabel>Precio total</StatLabel>
                  <StatNumber>${totalPrice}</StatNumber>
                </Stat>
             
             
            </>
          )
        ) : null}
      </Center>
      </>
  );
};

export default Grid;
