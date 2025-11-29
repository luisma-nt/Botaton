import React from 'react';

function ResumenKpi({ totalVoluntarios, totalActivos, totalCampanas = 0 }) {
  return (
    <div className="row mb-4">
      {/* Tarjeta 1: Total Voluntarios */}
      <div className="col-md-4">
        <div className="card text-white bg-primary mb-3">
          <div className="card-header">Total Voluntarios</div>
          <div className="card-body">
            <h2 className="card-title">{totalVoluntarios}</h2>
            <p className="card-text">Registrados en el sistema</p>
          </div>
        </div>
      </div>

      {/* Tarjeta 2: Voluntarios Activos */}
      <div className="col-md-4">
        <div className="card text-white bg-success mb-3">
          <div className="card-header">Voluntarios Activos</div>
          <div className="card-body">
            <h2 className="card-title">{totalActivos}</h2>
            <p className="card-text">Disponibles para campañas</p>
          </div>
        </div>
      </div>

      {/* Tarjeta 3: Campañas (Ejemplo) */}
      <div className="col-md-4">
        <div className="card text-white bg-warning mb-3">
          <div className="card-header">Campañas Activas</div>
          <div className="card-body">
            <h2 className="card-title">{totalCampanas}</h2>
            <p className="card-text">Procesos de selección en curso</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumenKpi;