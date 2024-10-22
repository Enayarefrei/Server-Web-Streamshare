import * as yup from "yup";

export const table_group_name = "Account";

export type group_type = {
    id: string,
    name: string,
    password: string,
    email: string,
    subscription: string,
    created_at: string
}



export const create_group_schema = yup.object({
    Name: yup.string().required(),
    Mail: yup.string().email().required(),
    Password: yup.string().required(),
    Subscription: yup.string().required()
}).noUnknown();

export const update_group_schema = yup.object({
    Name: yup.string().nullable(),
    Subscription: yup.string().nullable()
}).test('at-least-one', 'At least one field must not be null', (value) => {
    // Vérifie si au moins une des valeurs n'est pas null
    return Object.values(value).some(val => val !== null && val !== undefined);
}).noUnknown();

export const group_login_schema = yup.object({
    Mail: yup.string().email().required(),
    Password: yup.string().required()
}).noUnknown();