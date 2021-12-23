import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'multiFilter'
})

// Used for filtering multiple keys in an array against multiple values. In order of provided keys.
export class MultiFilterPipe implements PipeTransform {
	public transform(array: any[], keys: string[], terms: string[]) {
		if (!terms) { return array; }
		return (array || [])
			.filter((item: any) => {
				let it = true;
				keys.forEach((key, index) => {
					if (it === false) {
						return it;
					}
					it = item.hasOwnProperty(key) && item[key].toLowerCase().includes(terms[index].toLowerCase());
				});
				return it;
			});
	}
}
