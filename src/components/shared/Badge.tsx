import * as React from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  id?: string;
  content: string;
  onRemove?: (e: any) => void;
}

const BadgeComponent = (props: IProps) => {
  return (
    <span
      className={`qm-badge ${props.className}`}
      id={props.id}
    >
      <span className="badge-content">
        {props.content}
      </span>

      {props.onRemove && (
          <div className="badge-icon-container" onClick={props.onRemove}>
            X
          </div>
        )
      }
    </span>
  );
};

const Badge: React.FunctionComponent<IProps> = styled(BadgeComponent)`
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.27;
    border-radius: 2px;
    background: #22a8f0;
    color: white;
    & .badge-content {
        padding: 5px 7px;
    }
    & .ac-badge-icon-container {
        padding: 5px 7px;
        cursor: pointer;
    }
`;

export default Badge;
