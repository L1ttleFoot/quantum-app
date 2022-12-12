const letterIndexes='ijkl'

export const initialState = {
    numbers1: new Array(Number(3)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]})),
    numbers2: new Array(Number(3)).fill(undefined).map((item, index)=>({var: 'number', index: index+1, value: '', letIndex: letterIndexes[index]})),
    omegas: new Array(Number(3)).fill(undefined).map((item, index)=>({var: 'omega', index: index+1, value: '', letIndex: letterIndexes[index]})),
    consts: [],
    dipole0: {index: '0', value: '', var: 'dipole0', letIndex: '0'},
    dipoleX: [],
    dipoleY: [],
    dipoleZ: [],
    freedomDegrees: 3,
    order: 2,
    constsType: 'A',
    rows: []
}