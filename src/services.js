import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/"
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },

  function(error) {
    return new Promise.reject(error);
  }
)

export const api = {
  get(endpoint){
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body){
    return axiosInstance.post(endpoint, body);
  },
  deletar(endpoint){
    return axiosInstance.delete(endpoint);
  },
  atualizar(endpoint, body){
    return axiosInstance.put(endpoint, body);
  },
  login(body) {
    return axios.post(
      "http://localhost/Ranek/wp-json/jwt-auth/v1/token", 
      body
    );
  },
  validateToken() {
    return axiosInstance.post(
      "http://localhost/Ranek/wp-json/jwt-auth/v1/token/validate"
    );
  }
};

export function getCep(cep){
  return axios.get(`http://viacep.com.br/ws/${cep}/json/`);
}