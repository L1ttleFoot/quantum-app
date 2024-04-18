interface IConf {
    var: string;
    index: number;
    value: string;
    letIndex: string;
}

interface IConsts {
    index: string;
    letIndex: string;
    value: string;
    var: string;
}

export interface DataTypes {
    nList: string[];
    states: [{index: number; value: any[]}];
    omegas: IConf[];
    consts: IConsts[];
    dipole0: IConsts;
    dipoleX: IConsts[];
    dipoleY: IConsts[];
    dipoleZ: IConsts[];
    freedomDegrees: number;
    order: number;
    constsType: 'A' | 'k' | 'fi';
    rows: any[];
}

export interface HttpTypes {
    loadingConfig: boolean;
    statusConfig: number;
    loadingCalc: boolean;
    statusCalc: number;
}

export const letterIndexes = 'ijklxyzopqvcasdfghtremn';

const calcData: DataTypes = {
    nList: ['n_i', 'n_j', 'n_k'],
    states: [{index: 1, value: ['', '', '']}],
    omegas: new Array(Number(3))
        .fill(undefined)
        .map((_, index) => ({
            var: 'omega',
            index: index + 1,
            value: '',
            letIndex: letterIndexes[index],
        })),
    consts: [],
    dipole0: {index: '0', value: '0', var: 'dipole0', letIndex: '0'},
    dipoleX: [],
    dipoleY: [],
    dipoleZ: [],
    freedomDegrees: 3,
    order: 2,
    constsType: 'A',
    rows: [],
};

const calcHttp: HttpTypes = {
    loadingConfig: false,
    statusConfig: 200,
    loadingCalc: false,
    statusCalc: 200,
};

export const initialState = {
    calcData,
    calcHttp,
};
