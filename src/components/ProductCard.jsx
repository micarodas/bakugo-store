import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const ProductCard = ({
  imagen,
  nombre,
  precio,
  descripcionCorta,
  type,
  id,
  getProduct,
  removeFromCart,
  quantity,
}) => {
  const path = useLocation().pathname;
  let buttons;
  switch (path) {
    case "/cart":
      buttons = (
        <Button
          variant="solid"
          colorScheme="red"
          onClick={() => removeFromCart(id)}
        >
          Eliminar producto
        </Button>
      );
      break;
    default:
      buttons = (
        <Link to={`/products/${id}`}>
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => getProduct(id)}
          >
            Ver más
          </Button>
        </Link>
      );
      break;
  }

  return (
    <Card maxW="sm" mt={5} mx={5}>
      <CardBody>
        <Image
          src={imagen}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Link to={`/products/${id}`}>
            <Heading size="md">{nombre}</Heading>
          </Link>
          <Text>{descripcionCorta}</Text>
          <Text color="gray.500" fontSize="sm" fontWeight="bold">
            {type}
          </Text>
          {path === "/cart" ? (
            <Text color="green.700" fontSize="2xl">
              {precio} x {quantity} ={" "}
              {(precio * quantity).toLocaleString("es-ES", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          ) : (
            <Text color="green.700" fontSize="2xl">
              ${precio}
            </Text>
          )}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>{buttons}</CardFooter>
    </Card>
  );
};

export default ProductCard;