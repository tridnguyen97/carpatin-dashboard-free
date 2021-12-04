import axios from 'axios';

const baseUrl = 'http://103.130.215.154:4000/api';
export function getReceivingMaterial() {
  return axios.get(`${baseUrl}/receive`);
}

export function updateReceivingMaterial(id, receiving) {
  return axios.put(`${baseUrl}/receive/${id}`, receiving);
}
