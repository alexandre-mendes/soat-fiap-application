import http from 'k6/http';
import { sleep } from 'k6';

// Definindo a URL de destino
const url = 'http://localhost:30300/products/category/LANCHE';

// Configuração de VUs (Virtual Users) e duração do teste
export let options = {
  vus: 300,          // Número de usuários virtuais
  duration: '120s',   // Duração do teste
};

export default function () {
  // Fazendo a requisição GET
  http.get(url);
  
  // Espera de 1 segundo entre as requisições (simula uma pausa entre as requisições de cada usuário)
  sleep(1);
}
