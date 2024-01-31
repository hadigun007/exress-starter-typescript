export class KeyVal {
    private key!: string
    private val!: string

    public getKey(): string {
        return this.key;
    }

    public setKey(key: string): void {
        this.key = key;
    }

    public getVal(): string {
        return this.val;
    }

    public setVal(val: string): void {
        this.val = val;
    }

    public getPayload(): KeyVal {
        return this
    }

    validate(data: KeyVal): boolean {
        if (data.getKey() == "" || data.getVal() == "") return false
        return true
    }
}
