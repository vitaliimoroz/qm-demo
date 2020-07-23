import * as React from "react";
import Card from "./shared/Card";
import Flex from "./shared/Flex";
import Button from "./shared/Button";
import Select, { IOption } from "./shared/Select";
import { ICondition, IRightAttribute } from "../shared/interfaces/ICondition";
import Field from "./shared/Field";
import { NumberOperators } from "../shared/enums/NumberOperators";
import { FieldOptions } from "../shared/enums/FieldOptions";
import { getDataType, getOperatorOptions, fieldOptions, getPlaceholder } from "../shared/utils/common";
import NumberField from "./shared/NumberField";
import { StringOperators } from "../shared/enums/StringOperators";
import { DataType } from "../shared/enums/DataType";

interface IProps {
    condition: ICondition;
    onConditionRemove: () => void;
    onConditionChange: (condition: ICondition) => void;
}

const Condition = ({condition, onConditionRemove, onConditionChange}: IProps) => {
  const handlePredicateChange = (value: IOption) => {
      const newValue = value.value as FieldOptions;
      const newCondtion = { ...condition };
      newCondtion.LeftAttribute.AttributeName = newValue;
      newCondtion.LeftAttribute.DataTypeName = getDataType(newValue);
      newCondtion.RightAttribute = {};
      onConditionChange(newCondtion);
  };

  const handleOperatorChange = (value: IOption) => {
      const newCondtion = { ...condition };
      newCondtion.FunctionName = value.value;
      newCondtion.RightAttribute = {};
      onConditionChange(newCondtion);
  };

  const onValueChange = (field: keyof IRightAttribute, value: string | number | null) => {
      const newCondition = { ...condition };
      // @ts-ignore
      newCondition.RightAttribute[field] = value || "";
      onConditionChange(newCondition);
  };

  const handleValueChange = (field: keyof IRightAttribute) => (value: string | number | null) => onValueChange(field, value);

  const handleListValueChange = (value: string | null) => {
      const newCondition = { ...condition };
      // @ts-ignore
      newCondition.RightAttribute.ListValue = (value && value.split(",")) || [];
      onConditionChange(newCondition);
  };

  const valueField = () => {
      if (condition.LeftAttribute.DataTypeName === DataType.String) {
          return (
              <Field
                  value={condition.RightAttribute.Value}
                  onChange={handleValueChange("Value")}
                  className="qm-spacing-left-sm"
                  placeholder={getPlaceholder(condition.LeftAttribute.AttributeName)}
              />
          );
      }
      return (
          <NumberField
              value={Number(condition.RightAttribute.Value)}
              onChange={handleValueChange("Value")}
              className="qm-spacing-left-sm"
              placeholder={getPlaceholder(condition.LeftAttribute.AttributeName)}
          />
      );
  };

  return (
      <Card className="qm-spacing-bottom-md condition-row">
          <Flex alignItems="center" justifyContent="space-between">
              <Button onClick={onConditionRemove} isSimple={true}>
                X
              </Button>
              <Select
                  onChange={handlePredicateChange}
                  value={condition.LeftAttribute.AttributeName}
                  options={fieldOptions}
                  className="qm-spacing-left-sm"
              />
              {condition.FunctionName === NumberOperators.Between && (
                  <Field
                      value="is"
                      disabled={true}
                      className="qm-spacing-left-sm help-field"
                  />
                )
              }
              <Select
                  onChange={handleOperatorChange}
                  value={condition.FunctionName}
                  options={getOperatorOptions(condition.LeftAttribute.AttributeName)}
                  className="qm-spacing-left-sm"
              />
              {condition.FunctionName === NumberOperators.Between && (
                  <>
                    <NumberField
                        value={condition.RightAttribute.FromValue}
                        onChange={handleValueChange("FromValue")}
                        className="qm-spacing-left-sm"
                        placeholder="0"
                    />
                    <Field
                        value="and"
                        disabled={true}
                        className="qm-spacing-left-sm help-field"
                    />
                    <NumberField
                        className="qm-spacing-left-sm"
                        value={condition.RightAttribute.ToValue}
                        onChange={handleValueChange("ToValue")}
                        placeholder="0"
                    />
                  </>
                )
              }
              {((condition.FunctionName === NumberOperators.InList) || (condition.FunctionName === StringOperators.InList)) && (
                  <Field
                      value={condition.RightAttribute?.ListValue?.join(",") || ""}
                      onChange={handleListValueChange}
                      className="qm-spacing-left-sm"
                      placeholder="1,2,3.."
                  />
                )
              }
              {condition.FunctionName !== NumberOperators.Between &&
              !((condition.FunctionName === NumberOperators.InList) || (condition.FunctionName === StringOperators.InList)) && valueField()
              }
          </Flex>
      </Card>
  );
};

export default Condition;
