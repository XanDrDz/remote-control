export type Direction = 'up' | 'down' | 'right' | 'left'

export interface AllCommands {
    [index:string]: (width:number, length:number) => Promise<Response> | Promise<void>
}
export interface Response{
    data:string,
    type?:string
}