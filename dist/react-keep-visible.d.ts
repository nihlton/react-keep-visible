import { ReactNode } from 'react';
export type KeepVisibleProps = {
    top?: string;
    bottom?: string;
    children?: ReactNode;
};
declare const KeepVisible: (props: KeepVisibleProps) => import("react/jsx-runtime").JSX.Element;
export default KeepVisible;
