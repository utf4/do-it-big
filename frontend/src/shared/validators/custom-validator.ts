import { FormControl } from '@angular/forms';

// SINGLE FIELD VALIDATORS

// Validate if string contains only spaches
export function isBlankString(control: FormControl): any {
	const validWordRegexp = /^[^\s]+((?!\s{2,}).)*$/;
	if (control.value && !validWordRegexp.test(control.value)) {
		return { blankString: true };
	}
}
