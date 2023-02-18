import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "../components/Cart/Cart";
import Layout from "../components/Layout/Layout";
import Products from "../components/Shop/Products";
import { uiActions } from "../store/ui-slice";
import Notification from "../components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "sending data...",
        })
      );

      const res = await fetch("https://react-http-e5150-default-rtdb.firebaseio.com/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!res.ok) throw new Error("failed to send data");

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "send data successfully",
        })
      );
      return;
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((err) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: err,
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
