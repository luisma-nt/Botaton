// src/components/GestionVoluntarios.jsx
import { useState } from 'react';
import { useVoluntarios } from '../hooks/useVoluntarios';

function GestionVoluntarios() {
  const { voluntarios, loading, error, guardarVoluntario, buscarPorRegion } = useVoluntarios();
  const [filtroRegion, setFiltroRegion] = useState('');
  const [voluntarioForm, setVoluntarioForm] = useState({
    idLegado: '',
    nombre: '',
    email: '',
    telefono: '',
    region: '',
    habilidades: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await guardarVoluntario(voluntarioForm);
      setVoluntarioForm({
        idLegado: '',
        nombre: '',
        email: '',
        telefono: '',
        region: '',
        habilidades: ''
      });
      alert('Voluntario guardado exitosamente!');
    } catch (err) {
      alert('Error al guardar voluntario: ' + err.message);
    }
  };

  const handleFiltrarRegion = async () => {
    if (!filtroRegion.trim()) return;
    
    try {
      const resultado = await buscarPorRegion(filtroRegion);
      // Aquí podrías mostrar los resultados filtrados en un modal o otra sección
      alert(`Encontrados ${resultado.length} voluntarios en ${filtroRegion}`);
    } catch (err) {
      alert('Error al filtrar: ' + err.message);
    }
  };

  if (loading && voluntarios.length === 0) {
    return (
      <div className="d-flex justify-content-center my-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Voluntarios Teletón</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {/* Formulario para agregar/actualizar voluntarios */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Agregar/Actualizar Voluntario</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">ID Legado (Excel)*</label>
                <input
                  type="text"
                  className="form-control"
                  value={voluntarioForm.idLegado}
                  onChange={(e) => setVoluntarioForm({...voluntarioForm, idLegado: e.target.value})}
                  required
                />
                <div className="form-text">ID único del archivo Excel</div>
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Nombre Completo*</label>
                <input
                  type="text"
                  className="form-control"
                  value={voluntarioForm.nombre}
                  onChange={(e) => setVoluntarioForm({...voluntarioForm, nombre: e.target.value})}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={voluntarioForm.email}
                  onChange={(e) => setVoluntarioForm({...voluntarioForm, email: e.target.value})}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  value={voluntarioForm.telefono}
                  onChange={(e) => setVoluntarioForm({...voluntarioForm, telefono: e.target.value})}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Región</label>
                <input
                  type="text"
                  className="form-control"
                  value={voluntarioForm.region}
                  onChange={(e) => setVoluntarioForm({...voluntarioForm, region: e.target.value})}
                  placeholder="Ej: Metropolitana, Valparaíso..."
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Habilidades</label>
                <input
                  type="text"
                  className="form-control"
                  value={voluntarioForm.habilidades}
                  onChange={(e) => setVoluntarioForm({...voluntarioForm, habilidades: e.target.value})}
                  placeholder="Ej: Medicina, Logística, IT..."
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar Voluntario'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Filtro por región */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Filtrar por Región</h5>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-8">
              <label className="form-label">Región</label>
              <input
                type="text"
                className="form-control"
                value={filtroRegion}
                onChange={(e) => setFiltroRegion(e.target.value)}
                placeholder="Ej: Metropolitana"
              />
            </div>
            <div className="col-md-4">
              <button 
                className="btn btn-outline-primary w-100"
                onClick={handleFiltrarRegion}
                disabled={loading || !filtroRegion.trim()}
              >
                Buscar en Región
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de voluntarios */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Voluntarios Registrados: {voluntarios.length}</h5>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => window.location.reload()}
          >
            Actualizar
          </button>
        </div>
        <div className="card-body">
          {voluntarios.length === 0 ? (
            <p className="text-muted text-center py-3">No hay voluntarios registrados</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID Legado</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Región</th>
                    <th>Habilidades</th>
                  </tr>
                </thead>
                <tbody>
                  {voluntarios.map(voluntario => (
                    <tr key={voluntario.id || voluntario.idLegado}>
                      <td>{voluntario.idLegado}</td>
                      <td>{voluntario.nombre}</td>
                      <td>{voluntario.email || '-'}</td>
                      <td>{voluntario.telefono || '-'}</td>
                      <td>
                        {voluntario.region && (
                          <span className="badge bg-primary">{voluntario.region}</span>
                        )}
                      </td>
                      <td>{voluntario.habilidades || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GestionVoluntarios;