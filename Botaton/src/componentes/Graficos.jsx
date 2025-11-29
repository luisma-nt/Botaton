import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useVoluntarios } from '../hooks/useVoluntarios'; // Importamos tu hook

function GraficosApex() {
  // 1. Obtenemos los datos reales usando tu hook
  const { voluntarios, loading, error } = useVoluntarios();

  // Estados para los datos procesados de los gráficos
  const [datosOcupacion, setDatosOcupacion] = useState({
    categories: [],
    data: []
  });

  const [datosEstado, setDatosEstado] = useState({
    labels: [],
    series: []
  });

  // 2. Procesamos los datos cada vez que la lista de voluntarios cambie
  useEffect(() => {
    if (voluntarios && voluntarios.length > 0) {
      procesarDatosOcupacion();
      procesarDatosEstado();
    }
  }, [voluntarios]);

  // --- Lógica de Procesamiento Gráfico 1: Ocupaciones ---
  const procesarDatosOcupacion = () => {
    // Contamos cuántos hay de cada ocupación
    const contador = {};
    voluntarios.forEach(v => {
      // Usamos "Sin Información" si el campo viene null o vacío
      const ocupacion = v.ocupacion || 'Sin Información';
      contador[ocupacion] = (contador[ocupacion] || 0) + 1;
    });

    // Ordenamos para mostrar los más frecuentes primero y tomamos el top 10
    const ordenados = Object.entries(contador)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    setDatosOcupacion({
      categories: ordenados.map(([key]) => key),
      data: ordenados.map(([, value]) => value)
    });
  };

  // --- Lógica de Procesamiento Gráfico 2: Activos vs Inactivos ---
  const procesarDatosEstado = () => {
    let activos = 0;
    let inactivos = 0;

    voluntarios.forEach(v => {
      // Asumiendo que "1" es Activo y "0" es Inactivo según tus CSVs
      if (String(v.activo) === '1') {
        activos++;
      } else {
        inactivos++;
      }
    });

    setDatosEstado({
      labels: ['Activos', 'Inactivos/Otros'],
      series: [activos, inactivos]
    });
  };

  // --- Configuración de Gráficos (ApexCharts) ---

  // Configuración Gráfico de Barras (Ocupaciones)
  const optionsBar = {
    chart: {
      id: 'ocupaciones-bar',
      toolbar: { show: false }
    },
    colors: ['#e2303a'], // Rojo Teletón
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true, // Barras horizontales para leer mejor los nombres
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: datosOcupacion.categories
    },
    title: {
      text: 'Top Ocupaciones de Voluntarios',
      align: 'center'
    }
  };

  const seriesBar = [{
    name: 'Voluntarios',
    data: datosOcupacion.data
  }];

  // Configuración Gráfico Donut (Estado)
  const optionsPie = {
    chart: { type: 'donut' },
    colors: ['#66bb6a', '#ff6b6b'], // Verde para activos, Rojo para inactivos
    labels: datosEstado.labels,
    title: {
      text: 'Estado de la Base de Voluntarios',
      align: 'center'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' }
      }
    }]
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Dashboard Voluntarios Teletón</h2>
      
      {/* Manejo de estados de carga y error */}
      {loading && <div className="alert alert-info text-center">Cargando datos en tiempo real...</div>}
      {error && <div className="alert alert-danger text-center">Error cargando datos: {error}</div>}

      {!loading && !error && (
        <div className="row">
          {/* Gráfico 1: Ocupaciones */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <Chart 
                  options={optionsBar} 
                  series={seriesBar} 
                  type="bar" 
                  height={350} 
                />
              </div>
            </div>
          </div>
          
          {/* Gráfico 2: Estado */}
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <Chart 
                  options={optionsPie} 
                  series={datosEstado.series} 
                  type="donut" 
                  height={350} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Resumen numérico rápido */}
      {!loading && (
        <div className="row text-center">
          <div className="col-12">
            <p className="text-muted">
              Total de registros procesados: <strong>{voluntarios.length}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GraficosApex;