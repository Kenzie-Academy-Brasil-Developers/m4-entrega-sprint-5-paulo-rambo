import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPropertyRequest, IAddressRequest } from "../interfaces/properties";


const createAddressResponseSerializer: SchemaOf<IAddressRequest> = yup.object()
  .shape({
    district: yup.string().required(),
    zipCode: yup.string().max(8).required(),
    number: yup.string(),
    city: yup.string().required(),
    state: yup.string().max(2).min(2).required(),
});

const createPropertyResponseSerializer: SchemaOf<IPropertyRequest> = yup.object()
  .shape({
    value: yup.number().required(),
    size: yup.number().required(),
    address: createAddressResponseSerializer,
    categoryId: yup.string().required(),
});

export { createPropertyResponseSerializer, createAddressResponseSerializer }


