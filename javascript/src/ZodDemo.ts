import {z} from "zod";

const userDef = z.object({
    name: z.string().describe("姓名"),
    age: z.number().describe("年龄"),
    sex: z.enum(['male', 'female']),
});

type User = z.infer<typeof userDef>

const user: User = {
    name: 'zhoudailin',
    age: '22',
    sex: 'unknow'
}
const result = userDef.safeParse(user)

console.log(result)

function isUser(data: unknown): data is User {
    return userDef.safeParse(data).success
}