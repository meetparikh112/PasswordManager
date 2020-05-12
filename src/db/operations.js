const Realm = require('realm');
// www.instamobile.io/android-development/generate-react-native-release-build-android/
import moment from 'moment';

var key = new Int8Array(64);
export const PasswordSchema = {
  name: 'Passwords',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    login: 'string',
    password: 'string',
    website: 'string',
    notes: 'string',
    lastUpdatedDate: 'int',
  },
  schemaVersion: 5,
  deleteRealmIfMigrationNeeded: 1,
  encryptionKey: key,
};

export const getAllData = () => {
  return new Promise(function(resolve, reject) {
    Realm.open({
      schema: [PasswordSchema],
      encryptionKey: key,
    })
      .then(realm => {
        // pupulate with a secure key
        const allPasswords = realm.objects('Passwords').sorted('name');
        // console.log('allPasswords', allPasswords);
        resolve(Array.from(allPasswords));
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const createData = (name, login, password, website, notes) => {
  return new Promise((resolve, reject) => {
    Realm.open({
      schema: [PasswordSchema],
      encryptionKey: key,
    })
      .then(realm => {
        realm.write(() => {
          const data = realm.create('Passwords', {
            id: moment.utc().valueOf(),
            name: name,
            login: login,
            password: password,
            website: website,
            notes: notes,
            lastUpdatedDate: moment.utc().valueOf(),
          });
          console.log('CREATE data', data);
        });
        realm.close();
        resolve('DONE');
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const deleteAllData = () => {
  return new Promise((resolve, reject) => {
    Realm.open({
      schema: [PasswordSchema],
      encryptionKey: key,
    })
      .then(realm => {
        realm.write(() => {
          realm.deleteAll();
          resolve('DONE');
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const deleteData = id => {
  return new Promise((resolve, reject) => {
    Realm.open({
      schema: [PasswordSchema],
      encryptionKey: key,
    })
      .then(realm => {
        realm.write(() => {
          const passwordSelect = realm
            .objects('Passwords')
            .filtered('id = ' + id);
          realm.delete(passwordSelect);
          resolve();
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const editData = (id, name, login, password, website, notes) => {
  return new Promise((resolve, reject) => {
    Realm.open({
      schema: [PasswordSchema],
      encryptionKey: key,
    })
      .then(realm => {
        const passwordEdit = realm.objects('Passwords').filtered('id = ' + id);
        var lastUpdatedDate = passwordEdit[0].lastUpdatedDate;
        if (passwordEdit[0].password != password) {
          lastUpdatedDate = moment.utc().valueOf();
        }
        realm.write(() => {
          passwordEdit[0].name = name;
          passwordEdit[0].login = login;
          passwordEdit[0].password = password;
          passwordEdit[0].website = website;
          passwordEdit[0].notes = notes;
          passwordEdit[0].lastUpdatedDate = lastUpdatedDate;
        });
        // const ne12w = realm.objects('Passwords').filtered('id = ' + id);
        realm.close();
        resolve('DONE');
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
