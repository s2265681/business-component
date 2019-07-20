import * as React from 'react';
import { MentionsProps as RcMentionsProps } from 'rc-mentions/lib/Mentions';
import { OptionProps as RcOptionProps } from 'rc-mentions/lib/Option';
import { ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';
export declare type MentionPlacement = 'top' | 'bottom';
export interface OptionProps {
    value: string;
    children: React.ReactNode;
    [key: string]: any;
}
export interface MentionProps extends RcMentionsProps {
    loading?: boolean;
}
export interface MentionState {
    focused: boolean;
}
interface MentionsConfig {
    prefix?: string | string[];
    split?: string;
}
interface MentionsEntity {
    prefix: string;
    value: string;
}
declare class Mentions extends React.Component<MentionProps, MentionState> {
    static Option: React.FunctionComponent<RcOptionProps>;
    static getMentions: (value?: string, config?: MentionsConfig | undefined) => MentionsEntity[];
    state: {
        focused: boolean;
    };
    onFocus: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
    getNotFoundContent(renderEmpty: RenderEmptyHandler): {} | null | undefined;
    getOptions: () => {} | null | undefined;
    getFilterOption: () => any;
    renderMentions: ({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default Mentions;
