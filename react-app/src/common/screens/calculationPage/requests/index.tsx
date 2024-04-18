import {Dispatch} from 'redux';
import {DataTypes} from '../initialState';
import {
    setConsts,
    setDipoleX,
    setDipoleY,
    setDipoleZ,
    setRows,
    setRequestConfig,
    setRequestCalc,
} from '../slice';
import {saveAs} from 'file-saver';

//const url = 'https://quantum-app-backend.onrender.com/'
//const url = 'https://quantum-app-bf8b.vercel.app'
//const url = 'http://localhost:8080'

const url =
    process.env.REACT_APP_ENV === 'development'
        ? 'http://localhost:8080'
        : 'https://quantum-app-backend.onrender.com';

//const url = 'development' === 'development' ? 'http://localhost:8080' : 'https://quantum-app-backend.onrender.com'

interface IConfig {
    freedomDegrees: number;
    order: number;
}

type ErrorWithCode = Error & {code?: number};

const fetchConfig = (props: IConfig) => (dispatch: Dispatch) => {
    dispatch(setRequestConfig({status: 202, loading: true}));

    fetch(`${url}/api/v1/config?freedomDegrees=${props.freedomDegrees}&order=${props.order}`)
        .then((response) => {
            if (response.status !== 200) {
                const error: ErrorWithCode = new Error();
                error.code = response.status;
                throw error;
            }
            return response.json();
        })
        .then((data) => {
            dispatch(setConsts(data.consts_list));
            dispatch(setDipoleX(data.dipole_list_x));
            dispatch(setDipoleY(data.dipole_list_y));
            dispatch(setDipoleZ(data.dipole_list_z));
            dispatch(setRequestConfig({status: 200, loading: false}));
        })
        .catch((error) => {
            dispatch(setRequestConfig({status: error.code, loading: false}));
        });
};

const fetchCalc = (state: DataTypes) => async (dispatch: Dispatch) => {
    dispatch(setRequestCalc({status: 202, loading: true}));

    await fetch(`${url}/api/v1/calculation`, {
        method: 'POST',
        body: JSON.stringify({
            nList: state.nList,
            states: state.states.map((item) => item.value.map(Number)),
            freedomDegrees: state.freedomDegrees,
            order: state.order,
            omegas: state.omegas,
            consts: state.consts,
            dipoleX: [state.dipole0, ...state.dipoleX],
            dipoleY: [{index: '0', value: '0', var: 'dipole0', letIndex: '0'}, ...state.dipoleY],
            dipoleZ: [{index: '0', value: '0', var: 'dipole0', letIndex: '0'}, ...state.dipoleZ],
            constsType: state.constsType,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            dispatch(setRows([...state.rows, ...data]));
        })
        .catch((error) => {
            console.log(error);
        });

    dispatch(setRequestCalc({status: 200, loading: false}));
};

const fetchFile = async (state: DataTypes) => {
    await fetch(`${url}/api/v1/get_file`, {
        method: 'POST',
        body: JSON.stringify({
            nList: state.nList,
            omegas: state.omegas,
            consts: state.consts,
            dipoleX: [state.dipole0, ...state.dipoleX],
            dipoleY: [state.dipole0, ...state.dipoleY],
            dipoleZ: [state.dipole0, ...state.dipoleZ],
            constsType: state.constsType,
            order: state.order,
        }),
    })
        .then((response) => response.blob())
        .then((myBlob) => saveAs(myBlob, 'consts.py'))
        .catch((error) => {
            console.log(error);
        });
};

export {fetchConfig, fetchCalc, fetchFile};
