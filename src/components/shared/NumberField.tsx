import * as React from "react";
import styled from 'styled-components';

interface IProps {
    className?: string;
    disabled?: boolean;
    id?: string;
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number | null) => void;
    onFocusOut?: (value: number | null) => void;
    onKeyUp?: (value: number | null) => void;
    placeholder?: string;
    value?: number;
    isValid?: boolean;
}

const NumberFieldComponent = ({ step = 1, ...props }: IProps) => {
    const input = React.createRef<HTMLInputElement>();
    const defaultValue: string = (typeof props.value === "number" && !isNaN(props.value)) ? props.value.toString() : "";

    const parseValue = (value: string) => isNaN(value as any) ? null : parseInt(value, 10);

    const updateInputValue = (value?: any) => {
        if (input.current) {
            input.current.value = value;
        }
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.onChange) {
            const val = parseValue(event.currentTarget.value);
            props.onChange((typeof val === "number" && !isNaN(val)) ? val : null);
        }
    };

    const onBlur = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.onFocusOut) {
            props.onFocusOut(parseValue(event.currentTarget.value));
        }
    };

    const onKeyUp = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.onKeyUp) {
            updateInputValue(event.currentTarget.value);
            props.onKeyUp(parseValue(event.currentTarget.value));
        }
    };

    return (
      <div
          className={`field-wrapper input-number ${props.className}`}
      >
          <input
            className="qm-field"
            type="number"
            id={props.id}
            disabled={props.disabled}
            max={props.max}
            min={props.min}
            onChange={onChange}
            onBlur={onBlur}
            onKeyUp={onKeyUp}
            placeholder={props.placeholder as string}
            step={step}
            value={defaultValue}
            ref={input}
          />
      </div>
    );
};

const NumberField: React.FunctionComponent<IProps> = styled(NumberFieldComponent)`
    width: 100%;
    & .qm-field {
        background-color: ${props => props.disabled ? 'rgb(224, 230, 237)' : 'white'};
        border: 1px solid #dbdbde;
        color: rgb(144, 156, 170);
        &:hover {
            border-color: #22a8f0;
        }
        &:focus {
            border-color: #22a8f0;
        }
    }
`;

export default NumberField;
