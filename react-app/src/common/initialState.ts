export interface dataTypes {
    numbers1: any[],
    numbers2: any[],
    omegas: any[],
    consts: any[],
    dipole0: object,
    dipoleX: any[],
    dipoleY: any[],
    dipoleZ: any[],
    freedomDegrees: number,
    order: number,
    constsType: string,
    rows: any[]
}

export interface httpTypes {
    loadingConfig: boolean,
    statusConfig: number,
    loadingCalc: boolean,
    statusCalc: number,
    loadingRes: boolean,
    statusRes: number
}

const letterIndexes = 'ijkl'

const calcData: dataTypes = {
    numbers1: new Array(Number(3)).fill(undefined).map((item, index) => ({ var: 'number', index: index + 1, value: '', letIndex: letterIndexes[index] })),
    numbers2: new Array(Number(3)).fill(undefined).map((item, index) => ({ var: 'number', index: index + 1, value: '', letIndex: letterIndexes[index] })),
    omegas: new Array(Number(3)).fill(undefined).map((item, index) => ({ var: 'omega', index: index + 1, value: '', letIndex: letterIndexes[index] })),
    consts: [],
    dipole0: { index: '0', value: '0', var: 'dipole0', letIndex: '0' },
    dipoleX: [],
    dipoleY: [],
    dipoleZ: [],
    freedomDegrees: 3,
    order: 2,
    constsType: 'A',
    rows: []
}

const calcHttp: httpTypes = {
    loadingConfig: false,
    statusConfig: 200,
    loadingCalc: false,
    statusCalc: 200,
    loadingRes: false,
    statusRes: 200
}

export const initialState = {
    calcData,
    calcHttp
}

