import {compare, genSalt, hash} from "bcryptjs";

export class EncryptPassword{
    private readonly saltAmount: number = 10;
    public async hashPassword(password: string): Promise<string> {
        try {
            const salt = await genSalt(this.saltAmount);
            return await hash(password, salt);
        } catch (e) {
            console.log(e);
            return "";
        }
    }
    public async comparePassword(
        hash: string,
        password: string
    ): Promise<boolean> {
        return compare(password, hash);
    }
}