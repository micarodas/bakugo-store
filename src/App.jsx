import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import {  Form, Route, Routes  } from "react-router-dom";
import Grid from "./components/Grid";
import { db } from "../db/firebase-config.js";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import Product from "./components/Product";
import Forms from "./components/Forms"

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const productsCollectionRef = collection(db, "bakugo-store");
  const cartCollectionRef = collection(db, "cart");
  const [product, setProduct] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});

  const getProducts = async () => {
    const data = await getDocs(productsCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const getCart = async () => {
    const data = await getDocs(cartCollectionRef);
    setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setLoading(false);
  };

  const getProduct = async (id) => {
    const docRef = doc(db, "bakugo-store", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const product = docSnap.data();
      product.id = id;
      setSelectedProduct(product);
    } else {
      console.log("No such document!");
    }
  };

  const removeFromCart = async (id) => {
    const docRef = doc(db, "cart", id);
    await deleteDoc(docRef);
    console.log("Producto eliminado del carrito");
    const data = await getDocs(cartCollectionRef);
    setCart(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  
  useEffect(() => {
    console.log("Cart updated: ", cart);
  }, [cart]);

  const addToCart = async (id, quantity) => {
    const selectedProductCopy = { ...selectedProduct };
    selectedProductCopy.quantity = quantity;
    let isInCart = false;
    for (const item of cart) {
      if (item.id === id) {
        item.quantity = parseInt(item.quantity, 10) + parseInt(quantity, 10);
        isInCart = true;
        break;
      }
    }
    if (!isInCart) {
      selectedProductCopy.quantity = quantity;
      await addDoc(cartCollectionRef, selectedProductCopy).then(({ id }) => {
        console.log(`Documento con ID ${id} agregado al carrito`);
      });
      setCart([...cart, selectedProductCopy]);
    } else {
      setCart([...cart]);
    }
  };
  

  const handleAddToCart = () => {
  const existingProductIndex = cart.findIndex(p => p.id === product.id);
  if (existingProductIndex === -1) {
    addToCart({ ...product, quantity });
  } else {
    const updatedCart = [...cart];
    updatedCart[existingProductIndex].quantity += quantity;
    setCart(updatedCart);
  }
};

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, product) => total + (product.quantity * product.precio), 0);
};

const totalPrice = calculateTotalPrice(cart);

console.log(totalPrice);

const isCartEmpty = !cart || !cart.length;

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  return (
    <>
        <NavBar products={products} cart={cart} />
        <Container maxW="container.lg">
          <Banner />
          <Routes>
            <Route
              path="/"
              element={
                <Grid
                  loading={loading}
                  products={products}
                  getProduct={getProduct}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                />
              }
            />
            <Route path="/products/:id"
                    element={<Product loading={loading} product={selectedProduct} addToCart={addToCart} />
                } 
                        />
            <Route
              path="/cart"
              element={<Grid loading={loading} products={cart} removeFromCart={removeFromCart} totalPrice={totalPrice} isCartEmpty={isCartEmpty} />}
            />
            <Route
            path="/Forms"
            element={<Forms/>}
            />
          </Routes>
        </Container>
    </>
  );
}

export default App;