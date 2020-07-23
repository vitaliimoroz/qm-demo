import * as React from "react";
import classNames from "classnames";
import styled from "styled-components";

interface IProps {
  className?: string;
  onChange: (value: IOption) => void;
  options: IOption[];
  value: string;
}

export interface IOption {
   value: string;
   label: string;
}

const SelectComponent = (props: IProps) => {
    const [selectState, changeState] = React.useState({
        highlightedValue: "",
        isMenuOpened: false,
        isFocused: false
    });

    const onOptionClickHandler = (option: IOption) => () => onOptionClick(option);
    const onOptionHighlightHandler = (option: IOption) => () => onOptionHighlight(option);

    const onOptionClick = (option: IOption) => {
      changeState({
        ...selectState,
        isMenuOpened: false,
        isFocused: true
      });

      props.onChange(option);
    };

    const onOptionHighlight = (option: IOption) => {
      changeState({
          ...selectState,
          highlightedValue: option.value
      });
    };

    const onSelectionBlur = () => {
        changeState({
            ...selectState,
            isFocused: false
        });
    };

    const onSelectionClick = () => {
        changeState({
            highlightedValue: "",
            isFocused: true,
            isMenuOpened: true
        });
    };

    const onSelectionFocus = () => {
        changeState({
            ...selectState,
            isFocused: true
        });
    };

    const renderSelection = () => {
      const { className, options, value, onChange, ...otherProps } = props;
      const {  isFocused, isMenuOpened } = selectState;
      const selectedOption = options.find(el => el.value === value) || options[0];
      const ariaProps = {
        role: "combobox",
        "aria-expanded": isMenuOpened,
        "aria-selected": isFocused,
      };

      return (
        <span
          tabIndex={0}
          className={classNames(`select-selection`, { "is-focused": isFocused })}
          onFocus={onSelectionFocus}
          onBlur={onSelectionBlur}
          onClick={onSelectionClick}
          {...ariaProps}
          {...otherProps}
        >
            <span className="select-optionText">
                    {selectedOption.label}
            </span>
        </span>
      );
    };

    const renderOption = (option: IOption) => {
        const { value } = props;
        const { highlightedValue } = selectState;
        const className = classNames(`select-option`, {
          "is-highlighted": option.value === highlightedValue,
          "is-selected": value === option.value
        });

        return (
          <li
            key={`option-${option.value}`}
            className={className}
            role="option"
            aria-selected={value === option.value}
            onClick={onOptionClickHandler(option)}
            onMouseOver={onOptionHighlightHandler(option)}
          >
              <span className="select-optionText">
                  {option.label}
              </span>
          </li>
        );
    };

    return (
        <div className={props.className}>
          {renderSelection()}
          <ul
            role="listbox"
            className={classNames(`select-dropdown`, { "is-hidden": !selectState.isMenuOpened })}
            aria-expanded={selectState.isMenuOpened}
            aria-hidden={!selectState.isMenuOpened}
          >
            {props.options.map(renderOption)}
          </ul>
        </div>
    );
};

const Select: React.FunctionComponent<IProps> = styled(SelectComponent)`
    display: inline-block;
    font-size: 12px;
    position: relative;
    width: 100%;
    & .select-optionText {
        box-sizing: border-box;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 10px;
    }
    & .select-option {
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        list-style-type: none;
        margin: 0;
        outline: none;
        overflow: hidden;
        padding: 5px 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        &:first-of-type {
            border-radius: 4px 4px 0 0;
        }
        &:last-of-type {
            border-radius: 0 0 4px 4px;
        }
        &.is-selected {
            color: #000;
        }
        &.is-highlighted {
            background: #FFF;
        }
    }
    & .select-dropdown {
        background: #fff;
        border-radius: 3px;
        border: solid 1px #dbdbde;
        box-sizing: border-box;
        left: 0;
        margin-top: 2px;
        padding: 0;
        position: absolute;
        right: 0;
        top: 100%;
        z-index: 1;
        &.is-hidden {
            visibility: hidden;
        }
    }
    & .select-selection {
        border-radius: 3px;
        border: solid 1px #dbdbde;
        box-sizing: border-box;
        cursor: pointer;
        display: block;
        outline: none;
        padding: 5px 10px;
        &:hover,
        &.is-focused {
            border: solid 1px #22a8f0;
        }
        &:after {
            border-color: #999 transparent transparent;
            border-style: solid;
            border-width: 7px 5px 0;
            content: '';
            margin-top: -3.5px;
            position: absolute;
            right: 7px;
            top: 50%;
        }
    }
`;

export default Select;
