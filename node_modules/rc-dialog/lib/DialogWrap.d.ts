import * as React from 'react';
import IDialogPropTypes from './IDialogPropTypes';
declare class DialogWrap extends React.Component<IDialogPropTypes, any> {
    static defaultProps: {
        visible: boolean;
        forceRender: boolean;
    };
    _component: React.ReactElement<any>;
    renderComponent: (props: any) => void;
    removeContainer: () => void;
    shouldComponentUpdate({ visible, forceRender }: {
        visible: boolean;
        forceRender: boolean;
    }): boolean;
    componentWillUnmount(): void;
    saveDialog: (node: any) => void;
    getComponent: (extra?: {}) => JSX.Element;
    getContainer: () => HTMLDivElement;
    render(): any;
}
export default DialogWrap;
