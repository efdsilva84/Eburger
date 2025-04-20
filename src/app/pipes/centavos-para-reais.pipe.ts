import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'centavosParaReais',
  standalone: true
})
export class CentavosParaReaisPipe implements PipeTransform {

  transform(value: number): string {
    if (value == null) return '';
    const reais = value / 100;
    return reais.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}
