import { OriginPoint, Shape, Zone } from "./shape";

class T extends Shape {
	constructor(origin: OriginPoint, zone: Zone) {
		super(origin, zone)
		this.forms = this.makeForms(origin)
    }
    readonly name = 'T'
	makeForms(origin: OriginPoint) {
		const { x, y } = origin
		/**
 *          
 *        x
 *	    x 0 x 
 */
		const form1 = [
			[x + 1, y],
			[x-1, y],
            [x, y],
            [x, y - 1]
		]
		/**
		 *   x
		 *   0 x
         *   x
		 */
		const form2 = [
			[x, y],
			[x + 1, y],
			[x, y - 1],
			[x, y + 1],
		]
		/**
		 * 
		 *  x 0 x
         *    x
		 */
		const form3 = [
			[x, y],
			[x, y + 1],
			[x - 1, y],
			[x + 1, y],
		]
		/**
		 * 	  x
		 * x  0
         *    x
		 */

		const form4 = [
			[x, y],
			[x - 1, y],
			[x, y - 1],
			[x, y + 1]
		]
		return [form1, form2, form3, form4]
	}
}

export default T