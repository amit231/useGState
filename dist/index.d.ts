interface IgState {
    key: string;
    value: any;
}
declare const useGState: (gState: IgState) => any[];
declare const gState: (value: any) => IgState;
export default useGState;
declare const GStateProvider: ({ children }: {
    children: JSX.Element;
}) => JSX.Element;
export { GStateProvider, gState };
