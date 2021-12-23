import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'sort'
})
export class SortPipe implements PipeTransform {
	transform(array: any[], field: string, asc: boolean): any[] {
		if (field) {
			array.sort((a: any, b: any) => {
				const dataType = this.checkDataType(a[field]);
				if (dataType === 0 || dataType === 2) {
					if (asc) {
						if (a[field] < b[field]) {
							return -1;
						} else if (a[field] > b[field]) {
							return 1;
						} else {
							return 0;
						}
					} else {
						if (a[field] > b[field]) {
							return -1;
						} else if (a[field] < b[field]) {
							return 1;
						} else {
							return 0;
						}

					}
				} else {
					if (asc) {
						return new Date(a[field]).getTime() - new Date(b[field]).getTime();
					} else {
						return new Date(b[field]).getTime() - new Date(a[field]).getTime();
					}
				}
			});
		} else {
			array.sort((a: any, b: any) => {
				const dataType = this.checkDataType(a);
				if (dataType === 0 || dataType === 2) {
					if (asc) {
						if (a < b) {
							return -1;
						} else if (a > b) {
							return 1;
						} else {
							return 0;
						}
					} else {
						if (a > b) {
							return -1;
						} else if (a < b) {
							return 1;
						} else {
							return 0;
						}
					}
				} else {
					if (asc) {
						return new Date(a).getTime() - new Date(b).getTime();
					} else {
						return new Date(b).getTime() - new Date(a).getTime();
					}
				}
			});
		}
		return array;
	}

	private checkDataType(value: string): number {
		if (Number(value)) {
			return 0;
		} else if (Object.prototype.toString.call(new Date(value)) === '[object Date]' && !isNaN(new Date(value).getTime())) {
			return 1;
		} else {
			return 2;
		}
	}
}
