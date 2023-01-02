import { IUserRequest, IUser, IUserUpdate } from "../interfaces/users"
import * as yup from "yup";
import { SchemaOf } from "yup";

const createUserSerializer: SchemaOf<IUserRequest> = yup.object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required(),
  });

const createUserResponseSerializer: SchemaOf<IUser> = yup.object()
  .shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    isActive: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    id: yup.string().required(),
  });


const userUpdateSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    password: yup.string().notRequired()
})

export { createUserSerializer, createUserResponseSerializer, userUpdateSerializer };
