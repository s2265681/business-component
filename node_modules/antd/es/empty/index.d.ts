import * as React from 'react';
export interface TransferLocale {
    description: string;
}
export interface EmptyProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    /**
     * @since 3.16.0
     */
    imageStyle?: React.CSSProperties;
    image?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
}
declare const OriginEmpty: React.SFC<EmptyProps>;
declare type EmptyType = typeof OriginEmpty & {
    PRESENTED_IMAGE_DEFAULT: string;
    PRESENTED_IMAGE_SIMPLE: string;
};
declare const Empty: EmptyType;
export default Empty;
