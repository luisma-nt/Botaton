const BASE_URL = 'http://localhost:8080/api/load';

class DashboardApi {
  async request(endpoint) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return []; // Retorna vacío para no romper la app si falla
    }
  }

  async getInstitutos() { return this.request('/institutos'); }
  async getCampanias() { return this.request('/campanias'); }
  async getAsistencias() { return this.request('/asistencias'); }
}

export const dashboardApi = new DashboardApi();
