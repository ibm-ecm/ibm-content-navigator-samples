import { Subject } from 'rxjs/Subject';
 
export class ReactMessageService {
    constructor() {
        this.createBy = "ReactUserColumnSettingsPlugin"
        this.reactObservable = new Subject();
    }
 
    sendMessage(data) {
        this.reactObservable.next({ payload: data });
    }
 
    clearMessage() {
        this.reactObservable.next();
    }
 
    getMessage() {
        return this.reactObservable;
    }
}
