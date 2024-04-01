export type User = {
    id: string
    username: string
    name: string
    surname: string
    phoneNumber: string
    email: string
    token: string
    role: string
}

export type CreateUser = {
    username: string
    name: string
    surname: string
    password: string
    phoneNumber: string
    email: string
    isEmployee?: boolean
}

export type LoginDto = {
    email: string,
    password: string
}