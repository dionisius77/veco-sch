import storage from 'redux-persist/lib/storage';
import createEncryptor from 'redux-persist-transform-encrypt';
import { createBlacklistFilter } from "redux-persist-transform-filter";

const encryptor = createEncryptor({
  secretKey: 'kalo-pengen-sukses-jangan-cuma-ngelamun-aja-tapi-lakukan-suatu-hal',
  onError(error) {
    console.log('createEncryptor error ', error);
  },
});

const saveAuthSubsetBlacklistFilter = createBlacklistFilter(
  // 'auth',
  // ['data', 'res', 'action'],
);

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'root',
    storage,
    whitelist: ['layout'],
    transforms: [saveAuthSubsetBlacklistFilter, encryptor],
  },
};

export default REDUX_PERSIST;