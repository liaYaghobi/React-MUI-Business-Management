import { Grid, Button, Badge } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import { styled } from '@mui/system';

import axios from 'axios';

const PRODUCTS = [];

const StyledCartIcon = styled(ShoppingCartIcon)(({ theme }) => ({
  fontSize: 36,
  marginRight: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
}));

const CartContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
});

export default function ProductsPage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [fetched, setFetched] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      await getDatabase();
      setFetched(true);
    }
    fetchData();
    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const getDatabase = async (e) =>{
    const response =  await axios.get('http://localhost:8000/inventory/getAll');
    const itemList = response.data.map(item => {
      return {
        id: item.id,
        name: item.item_name,
        price: item.item_price
      };
    });
    var testInventory = [];
    itemList.forEach(item => {
        //prevents some accidental duping that was occuring...
        if (!PRODUCTS.some(i => i.id === item.id)){
            const newInventory = ([{ name: item.name, id: item.id, price: item.price  }]);
            testInventory.push(...newInventory);
        }
    });
    PRODUCTS.push(...testInventory);
    console.log(PRODUCTS);
    console.log(PRODUCTS.map((product) => (
      product.price
    )));
    //setUserList(USERLIST);
    //setUserList(testInventory);
  }

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };
  const handleDeleteItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  if (!fetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CartContainer>
        <Badge badgeContent={cart.length} color="primary">
          <StyledCartIcon onClick={handleCartClick} />
        </Badge>
      </CartContainer>
      <Grid container spacing={3} >
        {PRODUCTS.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <div >
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <Button
                variant="contained"
                size="medium"
                style={{
                  borderRadius: '15px',

                  transition: 'background-color 0.2s ease',
                  textTransform: 'none',
                  fontWeight: 500,
                  padding: '10px 20px',
                }}
                onClick={() => handleAddToCart(product)}
              > Add to Cart
              </Button>
            </div>
          </Grid>
        ))}
      </Grid>
      {showCart && (
        <div ref={cartRef} style={{ position: 'absolute', top: '100px', right: '100px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding: '10px' }}>
          <h4>Your Cart</h4>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '13px' }}>
                {item.name} - ${item.price}
              </p>
              <MinimizeOutlinedIcon onClick={() => handleDeleteItem(item.id)} fontSize="small" color="primary" />
            </div>
          ))}
          {cart.length > 0 && (
            <div>
              <hr />
              <p style={{ fontWeight: 'bold' }}>Total: ${cart.reduce((total, item) => total + item.price, 0)}</p>
              <Button
                variant="contained"
                size="small"
                sx={{ bgcolor: '#424242', color: '#fff', '&:hover': { bgcolor: '#303030' } }}
              >
                Checkout
              </Button>
            </div>
          )}

        </div>

      )}
    </>
  );
}