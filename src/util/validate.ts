export class Validate {
    static checkHex(s:string) {

        let n = s.length;

        for (let i = 0; i < n; i++) {
            let ch = s[i];

            if ((ch < '0' || ch > '9') &&
                (ch < 'A' || ch > 'F')) {
                return true;
            }
        }
        return false
    }
}