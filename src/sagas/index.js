import { all, put, takeEvery } from 'redux-saga/effects';
import { RENDER_DATA, GET_DATA, UPDATE_STYLE } from './../actions';

export const getData = (state) => state

export function* getStyleData() {
    const data = yield fetch('http://localhost:3001/data').then(response => response.json());    
    yield put({type: RENDER_DATA, data: data});
}

export function* loadStyleData() {
    yield takeEvery(GET_DATA, getStyleData);
}

export function* updateStyle() {
    yield takeEvery(UPDATE_STYLE, updateStyleData);
}

export default function* rootSaga() {
    yield all([loadStyleData(), updateStyle()]);
}

export function* updateStyleData(action) {
    const rec = action.data.filter((rec) => {return rec.id === action.id})[0]; 
    const url = 'http://localhost:3001/data/'+action.id;
    const body = JSON.stringify({
        id: rec.id,
        type: rec.type,
        styles: action.record,
        usage: rec.usage
    });
    yield fetch(url,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }).then(response => response.json());
    // console.log(data) ;
    // yield put({type: RENDER_DATA, data});
    // console.log(action);
    let data = action.data;
    const id = action.id;
    const record = action.record;
    data.filter((rec) => {return rec.id === id})[0].styles = record;
    console.log(JSON.stringify(data));
    yield put({type: RENDER_DATA, data});
}

