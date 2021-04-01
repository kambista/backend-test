import * as moment from 'moment-timezone'
import { TIME_ZONE } from '../consts';

export class Calendar {
	static getInstance() {
        return  moment().tz(TIME_ZONE).format();

    }
	static diffInMinutes(initial: string, final: string) :number {
        const startTime =  moment(initial)
        const endTime =  moment(final)
        const diff = moment.duration(endTime.diff(startTime)).asMinutes()
        const diffCeil = Math.ceil(diff)
        return  diffCeil
    }
}
