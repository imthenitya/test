import axios from "axios";
import { baseUrl, endPoints, config } from "./EndPoints";

export const sendUserAddress = (customerData) => {
  return axios.post(baseUrl + endPoints.sendCustomerData, customerData, {
    headers: config,
  });
};
export const submitOrderCall = (customer_id) => {
  return axios.post(
    baseUrl + endPoints.submitOrder + customer_id,
    {},
    { headers: config }
  );
};
export const getSuplementryOfferCall = (customer_id) => {
  return axios.get(baseUrl + endPoints.supplementryOffers + customer_id, {
    headers: config,
  });
};
export const addOfferToCartCall = (addOffer) => {
  return axios.post(baseUrl + endPoints.addOfferToCart, addOffer, {
    headers: config,
  });
};
export const viewCartContentCall = (customer_id) => {
  return axios.get(baseUrl + endPoints.viewCartContent + customer_id, {
    headers: config,
  });
};
export const removeItemCall = (customer_id, itemId) => {
  if (itemId) {
    return axios.delete(
      baseUrl + endPoints.removeItemFromCart + customer_id + "/items/" + itemId,
      { headers: config }
    );
  } else {
    return axios.delete(baseUrl + endPoints.removeItemFromCart + customer_id, {
      headers: config,
    });
  }
};
export const getPlanDetailsCall = (customer_id) => {
  return axios.get(
    baseUrl + endPoints.availableOffers + customer_id + "/PRIMARY",
    { headers: config }
  );
};
export const fetchOrderDetails = (customer_id) => {
  return axios.get(baseUrl + endPoints.fetchOrder + customer_id + "/orders", {
    headers: config,
  });
};
export const fetchOngoingOrderDetail = (customer_id, orderId) => {
  return axios.get(
    baseUrl +
      endPoints.fetchOrder +
      customer_id +
      "/orders/" +
      orderId +
      "/details",
    { headers: config }
  );
};
export const fetchInventoryDetails = (customer_id) => {
  return axios.get(baseUrl + endPoints.fetchInventory + customer_id, {
    headers: config,
  });
};
export const DeleteInventory = (customer_id, assetId) => {
  return axios.delete(
    baseUrl + endPoints.deleteInventory + customer_id + "/items/" + assetId,
    { headers: config }
  );
};
export const cancleOrder = (orderId) => {
  return axios.delete(baseUrl + endPoints.cancelorder + orderId + "/cancel", {
    headers: config,
  });
};
