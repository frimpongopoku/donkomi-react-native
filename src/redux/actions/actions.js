import {
  GET_AVAILABLE_ROLES,
  LOAD_NEWS,
  MODIFY_CART,
  MODIFY_MERCHANT_CART,
  NOTHING,
  REMOVE_DONKOMI_USER_AUTH,
  REMOVE_FIREBASE_AUTH,
  SET_APPLICATION_TOKEN,
  SET_CAMPAIGNS,
  SET_DONKOMI_USER,
  SET_FIREBASE_AUTH_USER,
  SET_MARKET_NEWS,
  SET_MARKET_NEWS_PARAMS,
  SET_MERCHANT_ORDERS,
  SET_NEWS_PARAMS,
  SET_ORDER_HISTORY,
  SET_ROUTINES,
  SET_SELLER_ORDERS,
  SET_STOCK,
  SET_USER_SHOPS,
  SET_USER_SHOP_ITEMS,
  SET_VENDORS,
  SHOW_FLOATING_MODAL,
  UPDATE_CAMPAIGN_CART,
} from "./constants";

import InternetExplorer from "./../../shared/classes/InternetExplorer";
import {
  CHECKOUT_PRODUCTS,
  DELETE_A_CAMPAIGN,
  DELETE_A_PRODUCT,
  DELETE_A_ROUTINE,
  DELETE_A_SHOP,
  DELETE_A_VENDOR,
  DELETE_STOCK,
  REGISTER_USER,
} from "../../shared/urls";

export const doNothingAction = () => {
  return { type: NOTHING, payload: ["something", "Here", "there"] };
};

export const setFirebaseAuthUserAction = (user) => {
  return { type: SET_FIREBASE_AUTH_USER, payload: user };
};
export const removeFirebaseAuthAction = () => {
  return { type: REMOVE_FIREBASE_AUTH, payload: null };
};
export const loadNewsAction = (news = []) => {
  return { type: LOAD_NEWS, payload: news };
};

//
export const setNewsParamsAction = (newsResponse = {}) => {
  return (dispatch, getState) => {
    const { newsParams } = getState();
    const prodMin = newsParams.prodMin || 0;
    const prodMax = newsParams.prodMax || 0;
    const campMin = newsParams.campMin || 0;
    const campMax = newsParams.campMax || 0;
    const newProdMin = compareAndGet(
      [prodMin, newsResponse.product_limits[0]],
      "min"
    );
    const newProdMax = compareAndGet(
      [prodMax, newsResponse.product_limits[1]],
      "max"
    );
    const newCampMin = compareAndGet(
      [campMin, newsResponse.campaign_limits[0]],
      "min"
    );
    const newCampMax = compareAndGet(
      [campMax, newsResponse.campaign_limits[1]],
      "max"
    );
    const params = {
      prodMin: newProdMin,
      prodMax: newProdMax,
      campMin: newCampMin,
      campMax: newCampMax,
    };
    dispatch({ type: SET_NEWS_PARAMS, payload: params });
  };
};

export const setApplicationTokenAction = (token) => {
  return (dispatch, getState) => {
    const fireAuth = getState().fireAuth; 
    // use fire auth that you collect here
    //use the uid to send a request to the backend and see if user has a a device token registered to their name, if there is
    dispatch({ type: SET_APPLICATION_TOKEN, payload: token });
  };
};
const compareAndGet = (values = [], comparisonType) => {
  const value1 = values[0];
  const value2 = values[1];
  if (comparisonType === "min") {
    if (value1 < value2 && value1 !== 0) return value1;
    // no db id is ever equal to 0, so it just means this is the first time, return value2
    else return value2;
  }
  if (comparisonType === "max") {
    if (value1 > value2) return value1;
    else return value2;
  }
  return 0;
};
export const setDonkomiUserAction = (user = null) => {
  return { type: SET_DONKOMI_USER, payload: user };
};
export const setOrderHistoryAction = (data = []) => {
  return { type: SET_ORDER_HISTORY, payload: data };
};

export const removeDonkomiUserAuthAction = () => {
  return setDonkomiUserAction();
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch(removeFirebaseAuthAction());
    dispatch(removeDonkomiUserAuthAction());
  };
};

export const checkoutAction = (successJsx) => {
  return (dispatch, getState) => {
    const { cart, user, orderHistory } = getState();
    const basket = cart?.basket || [];
    const packet = {};
    // group all products according to sellers
    basket.forEach((item) => {
      const user_id = item?.product?.creator.user_id;
      const sellerContent = packet[user_id];
      const obj = {
        qty: item.qty,
        total_price: item.price,
        product_id: item.product.id,
        shop: item?.product?.shops[0].id,
      };
      if (sellerContent) packet[user_id] = [...sellerContent, obj];
      else packet[user_id] = [obj];
    });

    InternetExplorer.roamAndFind(CHECKOUT_PRODUCTS, "POST", {
      user_id: user?.user_id,
      order_type: "PRODUCT_ORDER",
      cart: packet,
    })
      .then((response) => {
        if (!response) return;
        if (!response.success)
          return console.log(
            "BACKEND_CHECKOUT_ERROR",
            response.error?.message?.toString()
          );
        dispatch(modifyCartAction({})); // clear cart
        //shop notification of checkout success
        dispatch(
          showFloatingModalActions({ show: true, Jsx: successJsx, close: true })
        );
        // update order history in store with response data
        dispatch(setOrderHistoryAction([...orderHistory, response.data]));
      })
      .catch((e) => console.log("CHECKOUT_ERROR", e?.toString()));
  };
};

export const showFloatingModalActions = (
  props = { show: false, Jsx: null, close: true }
) => {
  return { type: SHOW_FLOATING_MODAL, payload: props };
};

export const modifyCartAction = (data = {}) => {
  return { type: MODIFY_CART, payload: data };
};
export const modifyMerchantCartAction = (data = {}) => {
  return { type: MODIFY_MERCHANT_CART, payload: data };
};

export const setUserShopsAction = (shops = null) => {
  return { type: SET_USER_SHOPS, payload: shops };
};
export const setUserShopItemsAction = (items = null) => {
  return { type: SET_USER_SHOP_ITEMS, payload: items };
};

export const setAvailableRolesAction = (roles = []) => {
  return { type: GET_AVAILABLE_ROLES, payload: roles };
};
export const setVendorsAction = (data = []) => {
  return { type: SET_VENDORS, payload: data };
};
export const setRoutinesAction = (data = []) => {
  return { type: SET_ROUTINES, payload: data };
};

export const setStockAction = (data = []) => {
  return { type: SET_STOCK, payload: data };
};
export const setSellerOrdersAction = (data = []) => {
  return { type: SET_SELLER_ORDERS, payload: data };
};
export const setMerchantOrdersAction = (data = []) => {
  return { type: SET_MERCHANT_ORDERS, payload: data };
};

export const setCampaignAction = (data = []) => {
  return { type: SET_CAMPAIGNS, payload: data };
};
export const setMarketNewsAction = (data = []) => {
  return { type: SET_MARKET_NEWS, payload: data };
};
export const setMarketNewsParamsAction = (response = {}) => {
  return { type: SET_MARKET_NEWS_PARAMS, payload: response };
};

export const putContentInStore = (type, load = []) => {
  return { type, load };
};

export const deleteACampaignFromBackend = (params) => {
  const { campaign } = params;
  return (dispatch, getState) => {
    const { campaigns, user } = getState();
    dispatch(
      deleteContentFromBackend(DELETE_A_CAMPAIGN, {
        user_id: user?.user_id,
        campaign_id: campaign?.id,
      })
    );
    dispatch(removeItemFromRedux(campaigns, "id", campaign.id, SET_CAMPAIGNS));
  };
};
export const deleteAProductFromBackend = (params) => {
  const { product } = params;
  return (dispatch, getState) => {
    const { products, user } = getState();
    dispatch(
      deleteContentFromBackend(DELETE_A_PRODUCT, {
        user_id: user?.user_id,
        shop_id: shop?.id,
      })
    );
    dispatch(
      removeItemFromRedux(products, "id", product.id, SET_USER_SHOP_ITEMS)
    );
  };
};
export const deleteAShopFromBackend = (params) => {
  const { shop } = params;
  return (dispatch, getState) => {
    const { shops, user } = getState();
    dispatch(
      deleteContentFromBackend(DELETE_A_SHOP, {
        user_id: user?.user_id,
        shop_id: shop?.id,
      })
    );
    dispatch(removeItemFromRedux(shops, "id", shop.id, SET_USER_SHOPS));
    //  remove related orders here...
  };
};
export const deleteRoutineFromBackend = (params) => {
  const { routine } = params;
  return (dispatch, getState) => {
    const { routines, user } = getState();
    dispatch(
      deleteContentFromBackend(DELETE_A_ROUTINE, {
        user_id: user?.user_id,
        routine_id: routine?.id,
      })
    );
    dispatch(removeItemFromRedux(routines, "id", routine.id, SET_ROUTINES));
  };
};
export const processAndDeleteStock = (params) => {
  const { stock } = params;
  return (dispatch, getState) => {
    const allStock = getState().stock;
    const user = getState().user;
    dispatch(
      deleteContentFromBackend(DELETE_STOCK, {
        user_id: user?.user_id,
        stock_id: stock?.id,
      })
    );
    dispatch(removeItemFromRedux(allStock, "id", stock.id, SET_STOCK));
  };
};
export const processAndDeleteVendor = (params) => {
  const { vendor, vendors, user_id } = params;
  return (dispatch, getState) => {
    const { stock } = getState();
    dispatch(
      deleteContentFromBackend(DELETE_A_VENDOR, {
        vendor_id: vendor.id,
        user_id,
      })
    );
    dispatch(removeRelatedStock(vendor, stock));
    dispatch(removeItemFromRedux(vendors, "id", vendor.id, SET_VENDORS));
  };
};

const removeRelatedStock = (vendor, stock = []) => {
  const items = stock.filter((s) => s.vendor !== vendor.id);
  return { type: SET_STOCK, payload: items };
};

const deleteContentFromBackend = (URL, body) => {
  InternetExplorer.send(URL, "POST", body).catch((e) => {
    console.log("ERROR_DELETING_CONTENT_FROM_BACKEND", e?.toString());
  });
  return { type: "NOTHING", payload: null };
};
const removeItemFromRedux = (list = [], key, value, type) => {
  const rem = list.filter((itm) => itm[key] !== value);
  return { type, payload: rem };
};

export const addToCampaignCartAction = (cart = {}) => {
  var numberOfItems = 0;
  Object.keys(cart?.basket).forEach(
    (key) =>
      (numberOfItems += Number(cart.basket[key]?.summary.numberOfOrders || 0))
  );
  return { type: UPDATE_CAMPAIGN_CART, payload: { ...cart, numberOfItems } };
};
