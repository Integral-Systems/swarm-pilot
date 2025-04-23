declare const AppError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => import("effect/Cause").YieldableError & {
    readonly _tag: "AppError";
} & Readonly<A>;
export declare class AppError extends AppError_base<{
    cause: Error;
    message: string;
}> {
}
declare const ScaleError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => import("effect/Cause").YieldableError & {
    readonly _tag: "ScaleError";
} & Readonly<A>;
export declare class ScaleError extends ScaleError_base<{
    cause: Error;
    message: string;
}> {
}
export {};
