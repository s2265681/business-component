import * as React from 'react';
import * as PropTypes from 'prop-types';
import BreadcrumbItem from './BreadcrumbItem';
import { ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';
export interface Route {
    path: string;
    breadcrumbName: string;
    children?: Omit<Route, 'children'>[];
}
export interface BreadcrumbProps {
    prefixCls?: string;
    routes?: Route[];
    params?: any;
    separator?: React.ReactNode;
    itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}
export default class Breadcrumb extends React.Component<BreadcrumbProps, any> {
    static Item: typeof BreadcrumbItem;
    static defaultProps: {
        separator: string;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        separator: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        routes: PropTypes.Requireable<any[]>;
        params: PropTypes.Requireable<object>;
    };
    componentDidMount(): void;
    getPath: (path: string, params: any) => string;
    addChildPath: (paths: string[], childPath: string | undefined, params: any) => string[];
    genForRoutes: ({ routes, params, separator, itemRender, }: BreadcrumbProps) => JSX.Element[];
    renderBreadcrumb: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
