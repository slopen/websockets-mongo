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