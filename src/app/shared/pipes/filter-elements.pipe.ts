import { Pipe, PipeTransform } from '@angular/core';
import { PeriodicElement } from '../../home/models/periodic-element.model';

@Pipe({
  name: 'filterElements',
  standalone: true,
})
export class FilterElementsPipe implements PipeTransform {
  transform(items: PeriodicElement[], keyword: string | null): PeriodicElement[] {
    // if (!items || !keyword) {
    //   return items;
    // }

    if (!items) {
      return [];
    }

    if (!keyword) {
      return items;
    }

    return items.filter(item =>
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.symbol.toLowerCase().includes(keyword.toLowerCase()) ||
      item.weight.toString().includes(keyword.toLocaleLowerCase())
    );
  }
}
