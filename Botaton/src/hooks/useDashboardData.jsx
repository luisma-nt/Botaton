import { useState, useEffect } from 'react';
import { dashboardApi } from '../servicios/dashboardApi';
import { voluntariosApi } from '../servicios/voluntariosApi';

export function useDashboardData() {
  const [data, setData] = useState({
    voluntarios: [],
    institutos: [],
    campanias: [],
    asistencias: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        setLoading(true);
        // Disparamos todas las peticiones al mismo tiempo
        const [v, i, c, a] = await Promise.all([
          voluntariosApi.listarTodos(),
          dashboardApi.getInstitutos(),
          dashboardApi.getCampanias(),
          dashboardApi.getAsistencias()
        ]);

        setData({
          voluntarios: v || [],
          institutos: i || [],
          campanias: c || [],
          asistencias: a || []
        });
      } catch (err) {
        console.error("Error cargando dashboard:", err);
        setError("Hubo un problema cargando los datos.");
      } finally {
        setLoading(false);
      }
    };

    cargarTodo();
  }, []);

  return { ...data, loading, error };
}