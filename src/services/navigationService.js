import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const navigationService = {
  navigate: (path, options = {}) => {
    history.push(path, options.state);
  },

  replace: (path, options = {}) => {
    history.replace(path, options.state);
  },

  goBack: () => {
    history.back();
  },

  goForward: () => {
    history.forward();
  },

  getCurrentPath: () => {
    return history.location.pathname;
  },

  listenToRouteChanges: (callback) => {
    return history.listen(callback);
  },
};

export default navigationService; 