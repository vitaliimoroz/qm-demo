import * as React from "react";
import styled from 'styled-components';

interface IProps {
    id?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string | null) => void;
    onClick?: (value: string | null) => void;
    onFocus?: (event: React.FocusEvent | null) => void;
    onBlur?: (value: string | null) => void;
    disabled?: boolean;
    className?: string;
    isValid?: boolean;
}

class FieldComponent extends React.Component<IProps> {
    static defaultProps: IProps = {
        disabled: false,
        placeholder: "",
        value: "",
        className: "",
        isValid: true
    };

    private readonly input: React.RefObject<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.input = React.createRef();
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            return this.props.onChange(e.currentTarget.value);
        }
    }
    onFocus = (event: React.FocusEvent) => {
        if (this.props.onFocus) {
            return this.props.onFocus(event);
        }
    }
    onBlur = (e: React.FormEvent<HTMLInputElement>) => {
        if (this.props.onBlur) {
            return this.props.onBlur(e.currentTarget.value);
        }
    }
    onClick = (e: React.FormEvent<HTMLInputElement>) => {
        if (this.props.onClick) {
            return this.props.onClick(e.currentTarget.value);
        }
    }
    render() {
        if (this.input.current) {
            this.updateInputValue(this.props.value || "");
        }
        return (
            <div className={`field-wrapper ${this.props.className}`}>
                <input
                    type="text"
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    disabled={this.props.disabled}
                    onChange={this.onChange}
                    value={this.props.value || ""}
                    className={`qm-field ${this.props.isValid ? "" : "not-valid"}`}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    onClick={this.onClick}
                    autoComplete="off"
                    ref={this.input}
                />
            </div>
        );
    }

    private updateInputValue = (value: string) => {
        this.input.current!.value = value;
    }
}


const Field: React.FunctionComponent<IProps> = styled(FieldComponent)`
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

export default Field;