import { FieldOptions } from "../enums/FieldOptions";
import { DataType } from "../enums/DataType";
import { NumberOperators } from "../enums/NumberOperators";
import { StringOperators } from "../enums/StringOperators";


const numberTypes = [
  FieldOptions.NumberOfVisits,
  FieldOptions.PageResponseTime,
  FieldOptions.ScreenHeight,
  FieldOptions.ScreenWidth
];

const numberOptions = [
  {
    label: "Equals",
    value: NumberOperators.Equals
  },
  {
    label: "Between",
    value: NumberOperators.Between
  },
  {
    label: "Greater Than",
    value: NumberOperators.GreaterThan
  },
  {
    label: "Less Than",
    value: NumberOperators.LessThan
  },
  {
    label: "In List",
    value: NumberOperators.InList
  }
];

const stringOptions = [
  {
    label: "Equals",
    value: StringOperators.Equals
  },
  {
    label: "Contains",
    value: StringOperators.Contains
  },
  {
    label: "Starts With",
    value: StringOperators.StartsWith
  },
  {
    label: "In List",
    value: StringOperators.InList
  }
];

export const fieldOptions = [
  {
    label: "Domain",
    value: FieldOptions.Domain
  },
  {
    label: "User Email",
    value: FieldOptions.UserEmail
  },
  {
    label: "First Name",
    value: FieldOptions.FirstName
  },
  {
    label: "Last Name",
    value: FieldOptions.LastName
  },
  {
    label: "Page Path",
    value: FieldOptions.PagePath
  },
  {
    label: "Screen Width",
    value: FieldOptions.ScreenWidth
  },
  {
    label: "Screen Height",
    value: FieldOptions.ScreenHeight
  },
  {
    label: "Number of Visits",
    value: FieldOptions.NumberOfVisits
  },
  {
    label: "Page Response Time",
    value: FieldOptions.PageResponseTime
  }
];

export const getDataType = (fieldName: FieldOptions): DataType => {
    return numberTypes.includes(fieldName) ? DataType.Number : DataType.String;
};

export const getOperatorOptions = (fieldName: FieldOptions) => {
    return numberTypes.includes(fieldName) ? numberOptions : stringOptions;
};

export const getPlaceholder = (fieldName: FieldOptions) => {
   switch (fieldName) {
      case FieldOptions.UserEmail:
          return "user@email.com";
      case FieldOptions.Domain:
          return "website.com";
      case FieldOptions.NumberOfVisits:
      case FieldOptions.ScreenHeight:
      case FieldOptions.ScreenWidth:
      case FieldOptions.PageResponseTime:
          return "0";
      case FieldOptions.PagePath:
          return "path/to/page";
      case FieldOptions.FirstName:
          return "John";
      case FieldOptions.LastName:
          return "Doe";
      default:
          return "value";
   }
};
