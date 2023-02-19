import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch("https://react-http-e5150-default-rtdb.firebaseio.com/cart.json");

      if (!res.ok) throw new Error("could not fetch cart data");
      const data = await res.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "sending data...",
      })
    );

    try {
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
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error,
        })
      );
    }
  };
};
