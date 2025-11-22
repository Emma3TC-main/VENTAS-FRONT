export interface PropiedadListado {
  id: string;
  nombre: string;
  direccion: string;
  rentaMes: number; 
  estado: 'Disponible' | 'Alquilada' | 'Mantenimiento' | 'Venta' | 'Alquiler' | 'Ocupada' | 'En Mantenimiento';
  imagenUrl: string; 
}