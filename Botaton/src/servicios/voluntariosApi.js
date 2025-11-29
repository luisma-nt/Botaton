// src/services/voluntariosApi.jsx
const BASE_URL = 'http://localhost:8080/api/voluntarios';

class VoluntariosApi {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async listarTodos() {
    return this.request('');
  }

  async guardar(voluntario) {
    return this.request('', {
      method: 'POST',
      body: JSON.stringify(voluntario),
    });
  }

  async buscarPorRegion(region) {
    return this.request(`/region/${region}`);
  }
}

export const voluntariosApi = new VoluntariosApi(BASE_URL);