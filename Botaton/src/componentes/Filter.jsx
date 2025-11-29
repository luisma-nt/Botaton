import React from 'react';
import { Search, Filter as FilterIcon, Briefcase } from 'lucide-react';

function Filter({ filtros, onFilterChange, regionesDisponibles }) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
            <FilterIcon className="text-danger me-2" size={20}/>
            <h5 className="card-title mb-0 fw-bold">Filtros de Búsqueda</h5>
        </div>
        
        <div className="row g-3">
          {/* 1. Buscador por Nombre */}
          <div className="col-md-3">
            <label className="form-label small text-muted fw-bold">Nombre Voluntario</label>
            <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                    <Search size={16} className="text-muted"/>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0 bg-light" 
                  placeholder="Ej: Juan..." 
                  value={filtros.busqueda}
                  onChange={(e) => onFilterChange('busqueda', e.target.value)}
                />
            </div>
          </div>

          {/* 2. Filtro de Habilidad (NUEVO) */}
          <div className="col-md-3">
            <label className="form-label small text-muted fw-bold">Habilidad / Profesión</label>
            <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                    <Briefcase size={16} className="text-muted"/>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0 bg-light" 
                  placeholder="Ej: Médico, Chofer..." 
                  value={filtros.habilidad}
                  onChange={(e) => onFilterChange('habilidad', e.target.value)}
                />
            </div>
          </div>

          {/* 3. Selector Región */}
          <div className="col-md-3">
            <label className="form-label small text-muted fw-bold">Región</label>
            <select 
              className="form-select bg-light" 
              value={filtros.region}
              onChange={(e) => onFilterChange('region', e.target.value)}
            >
              <option value="">Todas las Regiones</option>
              {regionesDisponibles.map(r => (
                  <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          {/* 4. Selector Estado */}
          <div className="col-md-3">
            <label className="form-label small text-muted fw-bold">Estado</label>
            <select 
              className="form-select bg-light" 
              value={filtros.estado}
              onChange={(e) => onFilterChange('estado', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;