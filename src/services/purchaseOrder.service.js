import axios from 'axios';

const baseUrl = 'http://103.130.215.154:4000/api';
export function getPurchaseOrder() {
  return axios.get(`${baseUrl}/purchase`);
}

export function createPurchaseOrder(purchaseOder) {
  return axios.post(`${baseUrl}/purchase`, purchaseOder);
}
