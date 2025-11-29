import React from 'react';

function FiltroResultados({ onFilterChange }) {
  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="card-title">Filtros Globales</h5>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Región</label>
          <select className="form-select" onChange={(e) => onFilterChange('region', e.target.value)}>
            <option value="">Todas</option>
            <option value="Metropolitana">Metropolitana</option>
            <option value="Valparaíso">Valparaíso</option>
            <option value="Biobío">Biobío</option>
            {/* Puedes llenar esto dinámicamente luego */}
          </select>
        </div>
        
        <div className="col-md-4">
          <label className="form-label">Estado</label>
          <select className="form-select" onChange={(e) => onFilterChange('estado', e.target.value)}>
            <option value="">Todos</option>
            <option value="1">Activo</option>
            <option value="0">Inactivo</option>
          </select>
        </div>
        
        <div className="col-md-4">
          <label className="form-label">Buscar por Nombre</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Escribe un nombre..." 
            onChange={(e) => onFilterChange('nombre', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default FiltroResultados;