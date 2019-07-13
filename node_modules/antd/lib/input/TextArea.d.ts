import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
export interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}
export declare type HTMLTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export interface TextAreaProps extends HTMLTextareaProps {
    prefixCls?: string;
    autosize?: boolean | AutoSizeType;
    onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}
export interface TextAreaState {
    textareaStyles?: React.CSSProperties;
}
declare class TextArea extends React.Component<TextAreaProps, TextAreaState> {
    nextFrameActionId: number;
    state: {
        textareaStyles: {};
    };
    private textAreaRef;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TextAreaProps): void;
    resizeOnNextFrame: () => void;
    focus(): void;
    blur(): void;
    resizeTextarea: () => void;
    handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    saveTextAreaRef: (textArea: HTMLTextAreaElement) => void;
    renderTextArea: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default TextArea;
