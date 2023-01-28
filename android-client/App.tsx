import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './src/Main';

const persistor = persistStore(store);
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
