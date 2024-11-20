import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import MoviesList from './components/MoviesList';

const App = () => {
  return (
    <Provider store={store}>
      <MoviesList />
    </Provider>
  );
};

export default App;
