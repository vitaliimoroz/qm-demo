import { ICondition } from "../interfaces/ICondition";
import { NumberOperators } from "../enums/NumberOperators";
import { StringOperators } from "../enums/StringOperators";
import { DataType } from "../enums/DataType";

const checkCondition = (condition: ICondition): boolean => {
    const leftPart = condition && !!condition.FunctionName && !!condition.LeftAttribute?.AttributeName;
    switch (condition.FunctionName) {
      case NumberOperators.Equals:
      case StringOperators.Equals:
      case NumberOperators.GreaterThan:
      case NumberOperators.LessThan:
      case StringOperators.Contains:
      case StringOperators.StartsWith:
          return leftPart && !!condition.RightAttribute.Value;
      case NumberOperators.InList:
      case StringOperators.InList:
          return leftPart && !!condition.RightAttribute.ListValue?.length;
      case NumberOperators.Between:
          return leftPart && !!condition.RightAttribute.FromValue && !!condition.RightAttribute.ToValue;
      default:
          return false;
    }
};

const getWhereStatement = (condition: ICondition): string => {
  switch (condition.FunctionName) {
    case NumberOperators.Equals:
    case StringOperators.Equals:
        const value = condition.LeftAttribute.DataTypeName === DataType.String 
            ? `'${condition.RightAttribute.Value}'`
            : condition.RightAttribute.Value;
        return `${condition.LeftAttribute.AttributeName} = ${value}`;
    case NumberOperators.GreaterThan:
        return `${condition.LeftAttribute.AttributeName} > ${condition.RightAttribute.Value}`;
    case NumberOperators.LessThan:
        return `${condition.LeftAttribute.AttributeName} < ${condition.RightAttribute.Value}`;
    case NumberOperators.InList:
    case StringOperators.InList:
        const list = condition.LeftAttribute.DataTypeName === DataType.String
            ? condition.RightAttribute.ListValue?.reduce((acc, curr) => `${acc ? `${acc}, ` : ""}'${curr}'`, "")
            : condition.RightAttribute.ListValue?.join(",");
        return `${condition.LeftAttribute.AttributeName} IN (${list})`;
    case StringOperators.Contains:
        return `${condition.LeftAttribute.AttributeName} LIKE '%${condition.RightAttribute.Value}%'`;
    case StringOperators.StartsWith:
        return `${condition.LeftAttribute.AttributeName} LIKE '${condition.RightAttribute.Value}%'`;
    case NumberOperators.Between:
        return `${condition.LeftAttribute.AttributeName} BETWEEN ${condition.RightAttribute.FromValue} AND ${condition.RightAttribute.ToValue}`;
    default:
        return "";
  }
};

export const generateScript = (conditions: ICondition[]): string => {
  let script = "SELECT * FROM session";
  if (conditions.length) {
    const whereStatements = [];
    for (const condition of conditions) {
        if (checkCondition(condition)) {
            whereStatements.push(getWhereStatement(condition));
        }
    }
    if (whereStatements.length) {
        script = `${script} \n WHERE ${whereStatements.join("\n AND ")}`;
    }
  }
  return script;
};