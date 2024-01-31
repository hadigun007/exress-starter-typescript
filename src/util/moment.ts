import moment from 'moment'

export class Momment {
    static getCurrent(){
        return moment().format().replace("T", " ").split("+")[0]; 
    }
}