import * as React from "react";
import styled from "styled-components";

interface IProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const CardComponent = (props: IProps) => {
    return (
        <div
          id={`${props.id || ""}`}
          className={`${props.className || ""}`}
        >
            {props.children}
        </div>
    );
};

const Card: React.FunctionComponent<IProps> = styled(CardComponent)`
    border-radius: 3px;
    border: 1px solid #dbdbde;
    background-color: #FFF;
    padding: 1rem;
`;

export default Card;
