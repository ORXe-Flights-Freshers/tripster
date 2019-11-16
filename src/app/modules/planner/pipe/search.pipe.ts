import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], key: string, searchQuery: string): any {
    console.log(JSON.stringify(items));
    if (!searchQuery) {
      return items;
    }
    return items.filter(item => item[key].toLowerCase().includes(searchQuery.toLowerCase())).sort();
  }

}
