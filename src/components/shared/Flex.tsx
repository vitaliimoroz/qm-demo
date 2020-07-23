import * as React from "react";

type AlignItemOptions = "flex-start" | "flex-end" | "center" | "stretch" | "normal" | "baseline";
type FlexDirections = "row" | "row-reverse" | "column" | "column-reverse";
type FlexDisplay = "flex" | "inline-flex";
type JustifyContentOptions = "flex-start" | "flex-end" | "center" | "space-around" | "space-between" | "normal";

interface IProps {
    alignItems?: AlignItemOptions;
    className?: string;
    direction?: FlexDirections;
    display?: FlexDisplay;
    id?: string;
    justifyContent?: JustifyContentOptions;
    wrapped?: boolean;
    children?: React.ReactNode;
}

const Flex = ({ display = "flex", alignItems = "normal", justifyContent = "normal", direction = "row", wrapped = false, ...props} : IProps) => {
    const getClassList = (): string => {
        const classList: string[] = ["qm-flex"];
        if (display) {
            classList.push(`display-${display}`);
        }
        if (alignItems) {
            classList.push(`align-items-${alignItems}`);
        }
        if (justifyContent) {
            classList.push(`justify-content-${justifyContent}`);
        }
        if (direction) {
            classList.push(`flex-direction-${direction}`);
        }
        if (wrapped) {
            classList.push(`flex-wrap`);
        }
        if (props.className) {
            classList.push(`${props.className}`);
        }
        return classList.join(" ");
    };

    const classList = getClassList();

    return (
        <div
            {...(props.id ? { id: props.id } : {})}
            className={classList}
        >
            {props.children || ""}
        </div>
    );
};

export default Flex;
