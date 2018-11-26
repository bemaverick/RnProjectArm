/** @format */

import moment from 'moment';

export const GET_REPOSITORIES = 'my-awesome-app/repos/LOAD';
export const GET_REPOSITORIES_SUCCESS = 'my-awesome-app/repos/LOAD_SUCCESS';
export const GET_REPOSITORIES_FAIL = 'my-awesome-app/repos/LOAD_FAIL';

export const GET_REPO_INFO = 'my-awesome-app/repos/INFO';
export const GET_REPO_INFO_SUCCESS = 'my-awesome-app/repos/INFO_SUCCESS';
export const GET_REPO_INFO_FAIL = 'my-awesome-app/repos/INFO_FAIL';

export const GET_USER = 'my-awesome-app/repos/USER';
export const GET_USER_SUCCESS = 'my-awesome-app/repos/USER_SUCCESS';
export const GET_USER_FAIL = 'my-awesome-app/repos/USER_FAIL';


const initialState = {
  repos: [],
  loadingRepos: false,
  repoInfo: {},
  loadingInfo: false,
  user: {},
  loadingProfile: false,
  totalCount: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REPOSITORIES:
      return {
        ...state,
        loadingRepos: true
      };
    case GET_REPOSITORIES_SUCCESS:

      return {
        ...state,
        loadingRepos: false,
        repos: action.payload.data.items.sort((a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf()),
        totalCount: action.payload.data.total_count
      };
    case GET_REPOSITORIES_FAIL:
      return {
        ...state,
        loadingRepos:
          false,
        error:
          'Error getting repos info'
      };
    case GET_REPO_INFO:
      return {
        ...state,
        loadingInfo: true
      };
    case GET_REPO_INFO_SUCCESS:
      return {
        ...state,
        loadingInfo: false,
        repoInfo: action.payload.data
      };
    case GET_REPO_INFO_FAIL:
      return {
        ...state,
        loadingInfo: false,
        errorInfo: 'Error getting repo info'
      };
    case GET_USER:
      return {
        ...state,
        loadingProfile: true
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loadingProfile: false,
        user: action.payload.data
      };
    case GET_USER_FAIL:
      return {
        ...state,
        loadingProfile: false,
        errorUser: 'Error getting user info'
      };
    default:
      return state;
  }
}

export function getRepositoriesByQuery(query, page = 0) {
  return {
    type: GET_REPOSITORIES,
    payload: {
      request: {
        // url: `/users/${user}/repos`
        url: `/search/repositories?q=${query}&per_page=30&page=${page}`
      }
    }
  };
}

export function getRepoDetail(user, repo) {
  return {
    type: GET_REPO_INFO,
    payload: {
      request: {
        url: `/repos/${user}/${repo}`
      }
    }
  };
}

export function getUser() {

  return {
    type: GET_USER,
    payload: {
      request: {
        url: `/search/repositories?q=tetris+language:assembly&sort=stars&order=desc`
      }
    }
  };
}

//
// export function postLogin(username, password) {
//   // console.log('>>>>> postLogin');
//   // let url = config.authentication_url;
//
//   // return {
//   //   type: POST_LOGIN,
//   //   payload: {
//   //     request: {
//   //       method: 'post',
//   //       url: url,
//   //       params: {
//   //         username: username,
//   //         password: password,
//   //         device: Platform.OS === 'ios' ? 'ios' : 'android',
//   //       }
//   //     }
//   //   }
//   // };
// }
