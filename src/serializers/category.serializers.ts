import * as yup from "yup";
import { SchemaOf } from "yup";
import { ICategoryRequest, IcategoryResponse } from "../interfaces/categories";

const categoryResponseSerializer : SchemaOf<IcategoryResponse> = yup.object().shape
    ({
        name: yup.string().required(),
        id: yup.string().required(),
    })
const categoryRequestSerializer : SchemaOf<ICategoryRequest> = yup.object().shape
    ({
        name: yup.string().required(),
    })

export { categoryRequestSerializer, categoryResponseSerializer }