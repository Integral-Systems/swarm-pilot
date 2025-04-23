import { Schema } from "effect";

export const LabelsSchema = Schema.Record({
    key: Schema.String,
    value: Schema.String
});