import {RENDER_DATA, UPDATE_STYLE, GET_STYLE, DOWNLOAD_STYLE} from './../actions';

export default function ElementStyles(state={},action) {
    switch (action.type) {
        case RENDER_DATA:
            return {
                ...state,
                data:action.data
            }
        case GET_STYLE:
            return {
                ...state,
                data:action.data,
                element: action.element,
                id: action.id,
                style: action.style,
                usage: action.usage
            }
        case UPDATE_STYLE:
            return {
                ...state,
                data:action.data,
                id: action.id,
                record: action.record
            }
        case DOWNLOAD_STYLE:
            return {
                ...state,
                data:action.data
            }
        default:
          return state;
      }
}
