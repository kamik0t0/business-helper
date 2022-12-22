import React, {
    ComponentProps,
    ElementType,
    PropsWithChildren,
    ReactNode,
} from "react";
import cn from "classnames";

/* 
E - некий тип который сужается до ElementType, т.е. до html-тега. Если тип не передан то по умолчанию тип = ElementType;
*/

type ButtonOwnProps<E extends ElementType = ElementType> = {
    children: string;
    primary?: boolean;
    secondary?: boolean;
    as?: E;
};

/* 
ComponentProps - это пропсы которые присущи конкретному html-элементу;
ButtonProps - это тип который является ButtonOwnProps но и + все типы которые идут из дженерика E исключая свои собственные типы 
*/

// type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & ComponentProps<E>;
type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
    Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const defaultElement = "button";

const PolyButton = <E extends ElementType = typeof defaultElement>({
    children,
    primary,
    secondary,
    as,
    ...otherProps
}: ButtonProps<E>) => {
    const classes = cn({ primary, secondary });

    const TagName = as || defaultElement;
    return (
        <TagName className={classes} {...otherProps}>
            {children}
        </TagName>
    );
};
export default PolyButton;

// usage
function App() {
    // Type '"foo"' is not assignable to type '"button" | "submit" | "reset" | undefined'.(2322)
    // return <Button type="foo"> sldkj </Button>

    // no error
    return <Button type="button"> text </Button>;
}

// implementation
export interface ButtonPropss extends React.ComponentPropsWithoutRef<"button"> {
    specialProp?: string;
}
export function Button(props: ButtonPropss) {
    const { specialProp, ...rest } = props;
    // do something with specialProp
    return <button {...rest} />;
}
