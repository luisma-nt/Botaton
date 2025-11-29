import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Users, Map as MapIcon } from 'lucide-react'; // Importamos icono para el mapa

function GraficosApex({ datos = [] }) {
  
  // 1. Procesamiento para Gráfico de Ocupaciones (Top 8 Agrupado)
  const dataOcupacion = useMemo(() => {
    if (!datos.length) return { categories: [], data: [] };

    const contador = {};
    datos.forEach(v => {
      let op = v.ocupacion || v.carrera || 'Sin Información';
      op = op.trim();
      // Capitalizar primera letra
      op = op.charAt(0).toUpperCase() + op.slice(1).toLowerCase();
      
      // FILTRO MEJORADO: Ignoramos explícitamente "Sin Información", "Null", vacíos, etc.
      const opLower = op.toLowerCase();
      if (
          op.length > 2 && 
          opLower !== 'null' && 
          opLower !== 'sin información' && 
          opLower !== 'sin informacion' &&
          opLower !== '--'
      ) {
        contador[op] = (contador[op] || 0) + 1;
      }
    });

    const ordenados = Object.entries(contador)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    return {
      categories: ordenados.map(([nombre]) => nombre),
      data: ordenados.map(([, cantidad]) => cantidad)
    };
  }, [datos]);

  // 2. Procesamiento para Gráfico de Estado
  const dataEstado = useMemo(() => {
    const activos = datos.filter(v => v.estado && v.estado.toLowerCase() === 'activo').length;
    const inactivos = datos.length - activos;
    return [activos, inactivos];
  }, [datos]);

  // 3. Procesamiento para Mapa de Calor (Distribución Regional)
  const dataRegion = useMemo(() => {
    const contador = {};
    datos.forEach(v => {
        let region = v.region || "Sin Información";
        if (region === "Sin Región" || region === "Sin Información") return; // Opcional: no mostrar regiones vacías en el mapa
        contador[region] = (contador[region] || 0) + 1;
    });

    return Object.entries(contador)
        .map(([nombre, cantidad]) => ({ x: nombre, y: cantidad }))
        .sort((a, b) => b.y - a.y);
  }, [datos]);

  // --- CONFIGURACIÓN VISUAL ---

  // A. Barras Horizontales
  const optionsBar = {
    chart: { id: 'ocupaciones-bar', toolbar: { show: false }, fontFamily: 'inherit', animations: { enabled: true } },
    colors: ['#e2303a'],
    plotOptions: { bar: { borderRadius: 4, horizontal: true, barHeight: '50%', dataLabels: { position: 'bottom' } } },
    dataLabels: { enabled: true, textAnchor: 'start', style: { colors: ['#fff'] }, offsetX: 0, formatter: (val) => val },
    xaxis: { categories: dataOcupacion.categories, labels: { show: true, style: { cssClass: 'small text-muted' } } },
    yaxis: { labels: { show: true, maxWidth: 300, style: { fontSize: '13px', fontWeight: 600, colors: ['#333'] } } },
    grid: { show: false, padding: { left: 0, right: 0 } },
    tooltip: { theme: 'light' }
  };

  // B. Dona
  const optionsPie = {
    chart: { type: 'donut', fontFamily: 'inherit' },
    labels: ['Activos', 'Inactivos'],
    colors: ['#198754', '#dc3545'],
    legend: { position: 'bottom', fontSize: '14px' },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '70%', labels: { show: true, name: { show: true, fontSize: '14px', color: '#888' }, value: { show: true, fontSize: '24px', fontWeight: 'bold', color: '#333', formatter: (val) => val }, total: { show: true, showAlways: true, label: 'Total', fontSize: '14px', color: '#888', formatter: () => datos.length } } } } },
    tooltip: { enabled: true, y: { formatter: (val) => `${val} voluntarios` } }
  };

  // C. Treemap
  const optionsTreemap = {
    chart: { type: 'treemap', fontFamily: 'inherit', toolbar: { show: false } },
    colors: ['#e2303a'],
    plotOptions: {
        treemap: {
            distributed: true,
            enableShades: true,
            shadeIntensity: 0.5,
            reverseNegativeShade: true,
            colorScale: {
              ranges: [
                { from: 0, to: 10, color: '#ffCDD2' },
                { from: 11, to: 50, color: '#e57373' },
                { from: 51, to: 100, color: '#f44336' },
                { from: 101, to: 10000, color: '#b71c1c' }
              ]
            }
        }
    },
    dataLabels: {
        enabled: true,
        style: { fontSize: '14px', fontWeight: 'bold', colors: ['#fff'] },
        offsetY: -4
    },
    tooltip: {
        y: { formatter: (val) => `${val} voluntarios` }
    }
  };

  return (
    <div className="container-fluid p-0">
        {/* FILA SUPERIOR */}
        <div className="row g-4 mb-4">
            <div className="col-md-3">
                <div className="card border-0 shadow-sm h-100 bg-danger text-white">
                <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-4">
                    <div className="bg-white bg-opacity-25 p-3 rounded-circle mb-3">
                    <Users size={40} className="text-white" />
                    </div>
                    <h6 className="text-uppercase text-white-50 fw-bold mb-2">Total Registros</h6>
                    <h1 className="display-4 fw-bold mb-0">{datos.length}</h1>
                    <p className="small text-white-50 mt-2 mb-0">Base de datos completa</p>
                </div>
                </div>
            </div>

            <div className="col-md-5">
                <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                    <h5 className="fw-bold mb-0 text-dark">Top Profesiones</h5>
                    <small className="text-muted">Más frecuentes en la base</small>
                </div>
                <div className="card-body">
                    {dataOcupacion.data.length > 0 ? (
                    <Chart options={optionsBar} series={[{ name: 'Voluntarios', data: dataOcupacion.data }]} type="bar" height={350} />
                    ) : <div className="text-center text-muted py-5">Sin datos suficientes o válidos</div>}
                </div>
                </div>
            </div>
            
            <div className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                    <h5 className="fw-bold mb-0 text-dark">Estado General</h5>
                    <small className="text-muted">Activos vs Inactivos</small>
                </div>
                <div className="card-body d-flex align-items-center justify-content-center">
                    <div style={{ width: '100%', minHeight: '280px' }}>
                    <Chart options={optionsPie} series={dataEstado} type="donut" height={280} />
                    </div>
                </div>
                </div>
            </div>
        </div>

        {/* FILA INFERIOR */}
        <div className="row">
            <div className="col-12">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 pt-4 px-4 pb-0 d-flex align-items-center">
                        <MapIcon className="me-2 text-danger" size={20}/>
                        <div>
                            <h5 className="fw-bold mb-0 text-dark">Distribución Regional </h5>
                            <small className="text-muted">Concentración de voluntarios por región</small>
                        </div>
                    </div>
                    <div className="card-body">
                        {dataRegion.length > 0 ? (
                            <Chart 
                                options={optionsTreemap} 
                                series={[{ data: dataRegion }]} 
                                type="treemap" 
                                height={350} 
                            />
                        ) : (
                            <div className="text-center py-5 text-muted">No hay datos regionales disponibles</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default GraficosApex;