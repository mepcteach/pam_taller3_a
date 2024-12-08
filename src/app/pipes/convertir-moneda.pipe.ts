import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertirMoneda', 
})
export class ConvertirMonedaPipe implements PipeTransform {

  transform(value: number, tasaCambio: number=820): string {
    const precioConvertido = value * tasaCambio;
    return `$${precioConvertido.toFixed(0)} CLP`;; // Redondea a 0 decimales
  }

}
