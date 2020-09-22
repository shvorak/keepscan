import React, {FC} from "react";

type HeadingProps = {
    size?: 1 | 2 | 3 | 4 | 5
}

/**
 * Component for <H{SIZE}> elements
 *
 * ```js
 * <Heading size={1}>Hello world!</Heading>
 * ```
 *
 * @param children
 * @constructor
 */
export const Heading: FC<HeadingProps> = ({size = 1, children}) => {
    return <h1>{children}</h1>
}