import * as React from "react";
import styled from "styled-components";
import classNames from "classnames";

interface IProps {
  className?: string;
  disabled?: boolean;
  id?: string;
  isSimple?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ButtonComponent = (props: IProps) => {
    const buttonRef = React.createRef<HTMLButtonElement>();

    const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            event.stopPropagation();
            props.onClick();
        }
    };

    return (
        <button
          onClick={onClick}
          {...(props.id) ? { id: props.id } : {}}
          {...(props.disabled ? { disabled: true } : {})}
          className={classNames(`qm-button ${props.className}`, { "simple": props.isSimple })}
          ref={buttonRef}
        >
          {props.children}
        </button>
    );
};

const Button: React.FunctionComponent<IProps> = styled(ButtonComponent)`
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-align: center;
    border: 0;
    color: white;
    height: auto;
    min-height: 17px;
    padding: 9px 20px 10px;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    vertical-align: middle;
    flex: 0 0 auto;
    max-width: 100%;
    background-color: ${props => props.disabled ? 'rgb(146, 146, 147)' : 'rgb(34,167,240)'};
    &:hover {
        opacity: 0.6;
    };
    &.simple {
        color: rgb(146, 146, 147);
        background-color: transparent;
    }
`;

export default Button;
