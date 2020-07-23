import { DataType } from "../enums/DataType";
import { FieldOptions } from "../enums/FieldOptions";

export interface ICondition {
  LeftAttribute: ILeftAttribute;
  RightAttribute: IRightAttribute;
  FunctionName: string;
}

export interface ILeftAttribute {
    AttributeName: FieldOptions;
    DataTypeName?: DataType;
}

export interface IRightAttribute {
    Value?: string;
    ListValue?: string[];
    FromValue?: number;
    ToValue?: number;
    DataTypeName?: DataType;
}
