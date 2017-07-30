import {
  userGetRequest,
  userGetSuccess,
  userPostRequest,
  userPostSuccess,
  userPatchRequest,
  userPatchSuccess,
} from './action-creators';
import {
  apiGet,
  apiPost,
  apiPatch,
} from '../api';

export const getUser = () =>
  (dispatch) => {
    dispatch(userGetRequest());
    return dispatch(apiGet('/user'))
      .then(res => res.json())
      .then(res => dispatch(userGetSuccess({ ...res.user })));
  };

export const postUser = () =>
  (dispatch) => {
    dispatch(userPostRequest());
    return dispatch(apiPost('/user', {}))
      .then(res => res.json())
      .then(res => dispatch(userPostSuccess(res)));
  };

export const patchUser = changes =>
  (dispatch) => {
    dispatch(userPatchRequest());
    return dispatch(apiPatch('/user', changes))
      .then(res => res.json())
      .then(() => {
        dispatch(userPatchSuccess());
        dispatch(getUser());
      });
  };

export default {
  getUser,
  postUser,
  patchUser,
};
