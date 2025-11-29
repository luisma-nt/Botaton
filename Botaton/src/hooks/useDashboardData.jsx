import { useState, useEffect } from 'react';
import { dashboardApi } from '../servicios/dashboardApi';
import { voluntariosApi } from '../servicios/voluntariosApi';

// 1. Diccionario de Regiones (IDs -> Nombres)
const MAPA_REGIONES = {
  "1": "Tarapacá",
  "2": "Antofagasta",
  "3": "Atacama",
  "4": "Coquimbo",
  "5": "Valparaíso",
  "6": "O'Higgins",
  "7": "Maule",
  "8": "Biobío",
  "9": "Araucanía",
  "10": "Los Lagos",
  "11": "Aysén",
  "12": "Magallanes",
  "13": "Metropolitana",
  "14": "Los Ríos",
  "15": "Arica y Parinacota",
  "16": "Ñuble"
};

// 2. Diccionario de Profesiones (Normalización)
const MAPA_PROFESIONES = {
  "MEDICO": "Médico Cirujano",
  "ENFERMERA": "Enfermería",
  "ENFERMERO": "Enfermería",
  "KINE": "Kinesiología",
  "KINESIOLOGO": "Kinesiología",
  "TERAPEUTA": "Terapia Ocupacional",
  "TO": "Terapia Ocupacional",
  "PSICOLOGO": "Psicología",
  "ASISTENTE SOCIAL": "Trabajo Social",
  "TRABAJADOR SOCIAL": "Trabajo Social",
  "FONOAUDIOLOGO": "Fonoaudiología",
  "NUTRICIONISTA": "Nutrición",
  "PROFESOR": "Pedagogía",
  "TECNICO": "Técnico Profesional",
  "ESTUDIANTE": "Estudiante",
};

// Helper para normalizar texto (quitar tildes y mayúsculas para comparar)
const normalize = (text) => text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";

const cleanVolunteers = (data) => {
  if (!Array.isArray(data)) return [];
  
  const listaNombresRegiones = Object.values(MAPA_REGIONES);

  return data.map(v => {
    // --- LÓGICA DE LIMPIEZA Y CORRECCIÓN ---
    
    // 1. Preparar variables
    let textoRegionOriginal = String(v.region || "").trim();
    let textoOcupacionOriginal = v.ocupacion || v.carrera || "";
    
    let regionFinal = "Sin Información";
    let ocupacionFinal = textoOcupacionOriginal;

    // 2. Analizar el campo 'region'
    if (textoRegionOriginal && textoRegionOriginal !== "NULL" && textoRegionOriginal !== "null") {
        
        // CASO A: Es un ID numérico válido ("13")
        if (MAPA_REGIONES[textoRegionOriginal]) {
            regionFinal = MAPA_REGIONES[textoRegionOriginal];
        } 
        // CASO B: Es un nombre de región válido ("Metropolitana", "Valparaíso")
        // Usamos normalize para comparar sin importar tildes o mayúsculas
        else if (listaNombresRegiones.some(r => normalize(textoRegionOriginal).includes(normalize(r))) || textoRegionOriginal.includes("Región")) {
            regionFinal = textoRegionOriginal;
        } 
        // CASO C: NO es región, es un texto largo ("Terapia Ocupacional") -> ES LA PROFESIÓN DESPLAZADA
        else if (textoRegionOriginal.length > 3) {
            // Si la ocupación original estaba vacía o nula, rescatamos este dato
            if (!ocupacionFinal || ocupacionFinal === "NULL" || ocupacionFinal === "--") {
                ocupacionFinal = textoRegionOriginal;
            }
            // La región se queda como "Sin Información" porque el dato original era incorrecto
            regionFinal = "Sin Información";
        }
    }

    // 3. Normalizar la Profesión final (ponerle nombre bonito si existe en el mapa)
    if (ocupacionFinal && ocupacionFinal !== "NULL") {
        const key = normalize(ocupacionFinal).toUpperCase();
        // Buscamos coincidencia parcial en las claves del mapa
        const match = Object.keys(MAPA_PROFESIONES).find(k => key.includes(k));
        if (match) {
            ocupacionFinal = MAPA_PROFESIONES[match];
        }
    } else {
        ocupacionFinal = "";
    }

    // 4. Generar Email Institucional Ficticio
    const nombreLimpio = (!v.nombres || v.nombres === "NULL") ? (v.nombre || "Sin Nombre") : v.nombres;
    const idReal = String(v.id || v.idLegado || crypto.randomUUID());
    const primerNombre = nombreLimpio.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
    const idShort = idReal.length > 4 ? idReal.slice(-4) : "0000";
    const emailGenerado = v.email || `${primerNombre}.${idShort}@voluntario.teleton.cl`;
    
    return {
      ...v,
      id: idReal,
      nombre: nombreLimpio,
      region: regionFinal,      // Ahora sí contiene SOLO regiones
      ocupacion: ocupacionFinal, // Ahora contiene la profesión real (incluso si venía en la columna región)
      email: emailGenerado,
      estado: (String(v.activo) === '1' || String(v.estado).toLowerCase() === 'activo') ? 'activo' : 'inactivo',
      campania: v.campania || "General"
    };
  });
};

export function useDashboardData() {
  const [data, setData] = useState({
    voluntarios: [],
    institutos: [],
    campanias: [],
    asistencias: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarTodo = async () => {
      try {
        setLoading(true);
        const [v, i, c, a] = await Promise.all([
          voluntariosApi.listarTodos(),
          dashboardApi.getInstitutos(),
          dashboardApi.getCampanias(),
          dashboardApi.getAsistencias()
        ]);

        setData({
          voluntarios: cleanVolunteers(v),
          institutos: i || [],
          campanias: c || [],
          asistencias: a || []
        });
      } catch (err) {
        console.error("Error cargando dashboard:", err);
        setError("Hubo un problema cargando los datos.");
      } finally {
        setLoading(false);
      }
    };

    cargarTodo();
  }, []);

  return { ...data, loading, error };
}