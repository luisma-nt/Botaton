// src/hooks/useVoluntarios.jsx
import { useState, useEffect } from 'react';
import { voluntariosApi } from '../servicios/voluntariosApi';

export function useVoluntarios() {
  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarVoluntarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await voluntariosApi.listarTodos();
      setVoluntarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const guardarVoluntario = async (voluntario) => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await voluntariosApi.guardar(voluntario);
      
      setVoluntarios(prev => {
        const existe = prev.find(v => v.id === resultado.id || v.idLegado === resultado.idLegado);
        if (existe) {
          return prev.map(v => v.id === resultado.id ? resultado : v);
        } else {
          return [...prev, resultado];
        }
      });
      
      return resultado;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const buscarPorRegion = async (region) => {
    try {
      setLoading(true);
      setError(null);
      const data = await voluntariosApi.buscarPorRegion(region);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVoluntarios();
  }, []);

  return {
    voluntarios,
    loading,
    error,
    cargarVoluntarios,
    guardarVoluntario,
    buscarPorRegion
  };
}