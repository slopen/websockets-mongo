// declare class Promise<+R> {
//     constructor (callback: (
//       resolve: (result: Promise<R> | R) => void,
//       reject: (error: any) => void
//     ) => mixed): void;

//     then<U> (
//       onFulfill?: (value: R) => Promise<U> | U,
//       onReject?: (error: any) => Promise<U> | U
//     ): Promise<U>;

//     catch<U> (
//       onReject?: (error: any) => Promise<U> | U
//     ): Promise<R | U>;

//     static resolve<T> (object: Promise<T> | T): Promise<T>;
//     static reject<T> (error?: any): Promise<T>;
//     static all<Elem, T:Iterable<Elem>> (promises: T): Promise<$TupleMap<T, typeof $await>>;
//     static race<T, Elem: Promise<T> | T> (promises: Array<Elem>): Promise<T>;
// }

declare module 'config' {
  declare module.exports: Object;
}

declare type JSONObject = {[key: string]: JSONValue};
declare type JSONValue = | null | boolean | string | number | JSONValue[] | JSONObject;

declare class JSON {
    static parse(text: string, ...args: []): JSONValue;
    static parse(text: string, reviver: (key: string, value: JSONValue) => any): mixed;
    static stringify(
      value: any,
      replacer?: ?((key: string, value: any) => any) | Array<any>,
      space?: string | number
    ): string;
}