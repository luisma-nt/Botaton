import React from 'react';
import { Users, UserCheck, Megaphone } from 'lucide-react';

function ResumenKpi({ kpis }) {
  const { total, activos, campaniasActivas } = kpis;

  const CardKpi = ({ title, value, icon: Icon, color, subtext }) => (
    <div className="col-md-4 mb-3">
      <div className="card border-0 shadow-sm h-100 overflow-hidden">
        <div className="card-body d-flex align-items-center">
          <div className={`rounded-3 p-3 me-3 bg-${color} bg-opacity-10`}>
            <Icon size={32} className={`text-${color}`} />
          </div>
          <div>
            <p className="text-muted mb-0 small text-uppercase fw-bold">{title}</p>
            <h2 className="fw-bold mb-0 text-dark">{value}</h2>
            <small className="text-muted">{subtext}</small>
          </div>
        </div>
        <div className={`bg-${color} h-1 w-100`} style={{height: '4px'}}></div>
      </div>
    </div>
  );

  return (
    <div className="row mb-4">
      <CardKpi 
        title="Total Voluntarios" 
        value={total} 
        icon={Users} 
        color="primary" 
        subtext="Registrados filtrados"
      />
      <CardKpi 
        title="Voluntarios Activos" 
        value={activos} 
        icon={UserCheck} 
        color="success" 
        subtext="Disponibles ahora"
      />
      <CardKpi 
        title="Campañas Activas" 
        value={campaniasActivas} 
        icon={Megaphone} 
        color="warning" 
        subtext="En curso nacional"
      />
    </div>
  );
}

export default ResumenKpi;