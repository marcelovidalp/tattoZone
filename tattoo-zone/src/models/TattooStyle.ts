/**
 * Enumeración de estilos de tatuajes disponibles
 */
export enum TattooStyleEnum {
  REALISMO = 'Realismo',
  TRADICIONAL = 'Tradicional',
  MINIMALISTA = 'Minimalista',
  BLACKWORK = 'Blackwork',
  ACUARELA = 'Acuarela',
  GEOMETRICO = 'Geométrico',
  NEOTRADICIONAL = 'Neotradicional',
  TODOS = 'Todos'
}

/**
 * Clase TattooStyle - Representa un estilo de tatuaje con sus características
 */
export class TattooStyle {
  public name: string;
  public description: string;
  public characteristics: string[];

  constructor(name: string, description: string, characteristics: string[] = []) {
    this.name = name;
    this.description = description;
    this.characteristics = characteristics;
  }

  toString(): string {
    return this.name;
  }

  /**
   * Método estático para obtener todos los estilos disponibles
   */
  static getAllStyles(): TattooStyle[] {
    return [
      new TattooStyle(TattooStyleEnum.REALISMO, 'Tatuajes hiperrealistas con gran detalle', ['Detalle extremo', 'Sombreado complejo']),
      new TattooStyle(TattooStyleEnum.TRADICIONAL, 'Estilo clásico americano', ['Líneas gruesas', 'Colores sólidos']),
      new TattooStyle(TattooStyleEnum.MINIMALISTA, 'Diseños simples y elegantes', ['Líneas finas', 'Poco color']),
      new TattooStyle(TattooStyleEnum.BLACKWORK, 'Tatuajes únicamente en negro', ['Solo tinta negra', 'Patrones geométricos']),
      new TattooStyle(TattooStyleEnum.ACUARELA, 'Efecto de pintura con acuarelas', ['Colores difuminados', 'Efecto splash']),
    ];
  }
}
