import {
  Box,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  Image,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { Link } from "react-router-dom";

const NavBar = ({ cart }) => {
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <Flex justify="space-between" background="blackAlpha.900">
      <Link to="/">
        <Box py={6} px={5}>
          <FaHome color="white" />
        </Box>
      </Link>
      <Flex>
      <Link to="Forms">
          <Box bg="teal" py={6} px={5} >
            <AiOutlineForm color="white" />
          </Box>
        </Link>
      </Flex>
      <Flex>
        <Link to="cart">
          <Box bg="teal" py={3} px={5}>
            <FaShoppingCart color="white" />
            <Text color="white">{totalQuantity}</Text>
          </Box>
        </Link>
      </Flex>
    </Flex>
  );
};

export default NavBar;