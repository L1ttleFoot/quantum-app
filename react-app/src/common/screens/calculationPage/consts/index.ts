export interface IConsts {
    value: string;
    label: string;
}

export const constsDict: IConsts[] = [
    {value: 'A', label: 'a'},
    {value: 'k', label: 'k'},
    {value: 'fi', label: decodeURI('%CF%86')}
]