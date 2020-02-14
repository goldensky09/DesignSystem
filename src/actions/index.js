export const GET_DATA = 'GET_DATA';
export const RENDER_DATA = 'RENDER_DATA';
export const GET_STYLE = 'GET_STYLE';
export const UPDATE_STYLE = 'UPDATE_STYLE';
export const DOWNLOAD_STYLE = 'UPDATE_STYLE';


export function getData() {
    return {
        type: GET_DATA
    }
}

export function getStyle() {
    return {
        type: GET_STYLE
    }
}

export function updateStyle(data) {
    return {
        type: UPDATE_STYLE,
    }
}

export function downloadStyle() {
    return {
        type: DOWNLOAD_STYLE
    }
}