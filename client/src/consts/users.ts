export type Role = 'user' | 'admin'

export type User = {
    firstName: string,
    lastName?: string,
    role: Role,
    password: string
}

export let users: User[] = [
    {
        firstName: 'Admin',
        role: "admin",
        password: 'admin'
    },
]