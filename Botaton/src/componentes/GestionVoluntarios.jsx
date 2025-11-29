import React from 'react';

// --- ICONOS SVG ---
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconMapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-1 text-danger opacity-75"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconMail = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 text-primary"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconGraduation = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2 text-warning"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;

function GestionVoluntarios({ datos }) {
  const displayData = datos.slice(0, 50);

  const safeText = (text) => {
    if (!text || text === "NULL" || text === "null") return null;
    return String(text).trim();
  };

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0 text-danger">Participantes Asociados</h5>
        <span className="badge bg-light text-dark">Mostrando {displayData.length} registros</span>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              {/* --- ENCABEZADOS (5 Columnas) --- */}
              <th className="border-0 ps-4">Nombre Voluntario</th>
              <th className="border-0" style={{width: '25%'}}>Profesión / Ocupación</th>
              <th className="border-0" style={{width: '25%'}}>Correo Generado</th>
              <th className="border-0 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((vol) => (
              <tr key={vol.id}>
                
                {/* 1. COLUMNA NOMBRE */}
                <td className="ps-4">
                  <div className="d-flex align-items-center">
                      <div className="bg-light rounded-circle p-2 me-3 text-secondary">
                          <IconUser />
                      </div>
                      <div>
                          <div className="fw-bold text-dark">{safeText(vol.nombre) || "Sin Nombre"}</div>
                          <div className="small text-muted" style={{fontSize: '0.75em'}}>ID: {vol.id}</div>
                      </div>
                  </div>
                </td>

                {/* 2. COLUMNA REGIÓN (Icono Mapa Rojo) */}
                <td>
                  <div className="d-flex align-items-center text-secondary fw-medium">
                      <IconMapPin />
                      {/* Aquí validamos explícitamente: si no hay región, mostrar texto por defecto */}
                      <span className="ms-2">
                        {safeText(vol.region) ? vol.region : <span className="text-muted fst-italic">Sin Región Asignada</span>}
                      </span>
                  </div>
                </td>

                {/* 3. COLUMNA PROFESIÓN (Icono Birrete Amarillo) */}
                <td>
                  <div className="d-flex align-items-center text-dark">
                      <IconGraduation />
                      {/* Aquí mostramos vol.ocupacion */}
                      <span>{safeText(vol.ocupacion) || <span className="text-muted fst-italic small">--</span>}</span>
                  </div>
                </td>

                {/* 4. COLUMNA CORREO (Icono Sobre Azul) */}
                <td>
                  <div className="d-flex align-items-center text-dark">
                      <IconMail />
                      {/* Aquí mostramos vol.email */}
                      <span className="small font-monospace text-primary">{vol.email}</span>
                  </div>
                </td>

                {/* 5. COLUMNA ESTADO */}
                <td className="text-center">
                  <span className={`badge rounded-pill ${vol.estado === 'activo' ? 'bg-success bg-opacity-10 text-success' : 'bg-secondary bg-opacity-10 text-secondary'}`}>
                    {vol.estado.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
            
            {displayData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5 text-muted">
                    No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GestionVoluntarios;