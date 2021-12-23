import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	public transform(array: any[], keys: string[], term: string) {
		if (!term) { return array; }
		return (array || [])
			.filter((item: any) =>
				keys.some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi')
					.test(item[key])));
	}
}
