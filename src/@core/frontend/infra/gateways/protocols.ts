export type HttpGatewayResponse<Type extends "success" | "failed"> = Type extends "success"
    ? { data: any }
    : { errors: string[] }
