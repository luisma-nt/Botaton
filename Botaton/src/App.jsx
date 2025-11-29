import { useState } from 'react';
import NavBar from './componentes/NavBar';
import Footer from './componentes/Footer';
import GraficosApex from './componentes/Graficos';
import GestionVoluntarios from './componentes/GestionVoluntarios';
import ResumenKpi from './componentes/ResumenKpi';
import FiltroResultados from './componentes/Filter';
import { useDashboardData } from './hooks/useDashboardData';

function App() {
  // 1. Llamamos al Hook Unificado
  const { voluntarios, campanias, asistencias, loading } = useDashboardData();
  const [filtros, setFiltros] = useState({});

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status"></div>
          <h4 className="mt-3">Cargando Dashboard Teletón...</h4>
        </div>
      </div>
    );
  }

  // 2. Calculamos KPIs con los datos reales
  const totalVoluntarios = voluntarios.length;
  
  // Asumiendo que Activo="1" es activo
  const totalActivos = voluntarios.filter(v => String(v.activo) === '1').length;
  
  // Campañas Totales
  const totalCampanas = campanias.length;

  // Cálculo de Tasa de Asistencia (Ej: Asistencia="1")
  const asistenciasPositivas = asistencias.filter(a => String(a.asistencia) === '1').length;
  const tasaAsistencia = asistencias.length > 0 
    ? Math.round((asistenciasPositivas / asistencias.length) * 100) 
    : 0;

  const handleFilterChange = (campo, valor) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
    // Aquí podrías implementar la lógica para filtrar los datos que pasas a los gráficos
  };

  return (
    <>
      <NavBar/>
      <div className="container mt-4 mb-5">
        
        {/* KPIs Superiores */}
        <ResumenKpi 
          totalVoluntarios={totalVoluntarios} 
          totalActivos={totalActivos} 
          totalCampanas={totalCampanas} 
        />

        {/* Alerta de Asistencia */}
        <div className="alert alert-light border shadow-sm text-center mb-4">
          <span className="h5">🎓 Tasa de Asistencia a Capacitaciones: </span>
          <span className="h4 fw-bold text-success">{tasaAsistencia}%</span>
          <small className="d-block text-muted mt-1">
            ({asistenciasPositivas} asistencias confirmadas de {asistencias.length} registros)
          </small>
        </div>

        {/* Filtros y Gráficos */}
        <FiltroResultados onFilterChange={handleFilterChange} />

        {/* Gráficos con datos reales */}
        {/* Nota: GraficosApex debe estar preparado para recibir la prop 'data' */}
        <GraficosApex /> 

        {/* Tabla de Gestión */}
        <GestionVoluntarios />
        
      </div>
      <Footer/>
    </>
  );
}

export default App;