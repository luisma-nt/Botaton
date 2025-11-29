import { useState, useMemo } from 'react';
import NavBar from './componentes/NavBar';
import Footer from './componentes/Footer';
import GraficosApex from './componentes/Graficos';
import GestionVoluntarios from './componentes/GestionVoluntarios';
import ResumenKpi from './componentes/ResumenKpi';
import Filter from './componentes/Filter';
import { useDashboardData } from './hooks/useDashboardData';

function App() {
  const { voluntarios, campanias, loading, error } = useDashboardData();
  
  // Agregamos 'habilidad' al estado de filtros
  const [filtros, setFiltros] = useState({
    region: '',
    estado: '',
    busqueda: '',
    habilidad: '' // Nuevo campo
  });

  // Lógica de Filtrado Mejorada
  const datosFiltrados = useMemo(() => {
    return voluntarios.filter(vol => {
      // 1. Filtro Región
      const matchRegion = !filtros.region || vol.region === filtros.region;
      
      // 2. Filtro Estado
      const matchEstado = !filtros.estado || vol.estado === filtros.estado;
      
      // 3. Filtro Nombre (Búsqueda)
      const matchBusqueda = !filtros.busqueda || 
        vol.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase());

      // 4. Filtro Habilidad (Busca en Ocupación O Carrera)
      const termHabilidad = filtros.habilidad.toLowerCase();
      const matchHabilidad = !filtros.habilidad || 
        (vol.ocupacion && vol.ocupacion.toLowerCase().includes(termHabilidad)) ||
        (vol.carrera && vol.carrera.toLowerCase().includes(termHabilidad));
      
      return matchRegion && matchEstado && matchBusqueda && matchHabilidad;
    });
  }, [voluntarios, filtros]);

  const kpis = {
    total: datosFiltrados.length,
    activos: datosFiltrados.filter(v => v.estado === 'activo').length,
    campaniasActivas: campanias.length
  };

  const handleFilterChange = (key, value) => {
    setFiltros(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-danger" role="status" style={{width: '3rem', height: '3rem'}}></div>
          <p className="mt-3 text-muted fw-bold">Cargando Sistema Teletón...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger m-5">{error}</div>;
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <NavBar/>
      
      <div className="container py-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-0">Dashboard de Gestión</h2>
            <p className="text-muted mb-0">Visión general de voluntarios y cobertura</p>
          </div>
          <span className="badge bg-white text-danger border shadow-sm p-2">
            Resultados: {datosFiltrados.length}
          </span>
        </div>

        <ResumenKpi kpis={kpis} />

        <Filter 
          filtros={filtros} 
          onFilterChange={handleFilterChange} 
          regionesDisponibles={[...new Set(voluntarios.map(v => v.region).filter(Boolean))]} 
        />

        {/* Los gráficos responden a los filtros de habilidad también */}
        <div className="row mb-4">
          <div className="col-12">
            <GraficosApex datos={datosFiltrados} />
          </div>
        </div>

        {/* Tabla Detallada */}
        <GestionVoluntarios datos={datosFiltrados} />
        
      </div>
      <Footer/>
    </div>
  );
}

export default App;