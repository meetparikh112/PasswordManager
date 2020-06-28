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
    website: 'string',
    accounts: {type: 'list', objectType: 'Account'},
  },
  schemaVersion: 9,
  deleteRealmIfMigrationNeeded: 1,
  encryptionKey: key,
};

export const Accountchema = {
  name: 'Account',
  primaryKey: 'id',
  properties: {
    id: 'int',
    passwordId: 'int',
    account: 'string',
    login: 'string',
    password: 'string',
    note: 'string',
    lastUpdatedDate: 'int',
  },
  schemaVersion: 9,
  deleteRealmIfMigrationNeeded: 1,
  encryptionKey: key,
};

export const getAllData = () => {
  return new Promise(function(resolve, reject) {
    Realm.open({
      schema: [PasswordSchema, Accountchema],
      encryptionKey: key,
    })
      .then(realm => {
        // pupulate with a secure key
        const allPasswords = realm.objects('Passwords').sorted('name');
        let pass = Array.from(allPasswords);
        pass.map(p => {
          p.accountsNew = Array.from(p.accounts);
          delete p.accounts;
        });
        // realm.close();
        console.log(JSON.parse(JSON.stringify(pass)));
        resolve(JSON.parse(JSON.stringify(pass)));
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
        // pupulate with a secure key
        const allPasswords = realm.objects('Passwords').sorted('name');
        // console.log('allPasswords', allPasswords);
        realm.close();
        resolve(Array.from(allPasswords));
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const createDataNew = item => {
  return new Promise((resolve, reject) => {
    Realm.open({
      schema: [PasswordSchema, Accountchema],
      encryptionKey: key,
    })
      .then(realm => {
        realm.write(() => {
          let data = realm.create(
            'Passwords',
            {
              id: moment.utc().valueOf(),
              name: item.name,
              website: item.webAddress,
            },
            true,
          );
          // console.log('data 1', data);

          // if (item.accounts.length > 0) {
          // console.log('12');
          item.accounts.map(itm => {
            // console.log('122222');
            // let account = realm.create(
            //   'Account',
            //   {
            //     id: moment.utc().valueOf(),
            //     passwordId: data.id,
            //     name: itm.account,
            //     login: itm.login,
            //     password: itm.password,
            //     note: itm.note,
            //     lastUpdatedDate: moment.utc().valueOf(),
            //   },
            //   true,
            // );
            // console.log(account);
            // console.log('data.accounts', data.accounts);
            let accou = {
              id: moment.utc().valueOf(),
              passwordId: data.id,
              account: itm.account,
              login: itm.login,
              password: itm.password,
              note: itm.note,
              lastUpdatedDate: moment.utc().valueOf(),
            };
            data.accounts.push(accou);
            console.log('data ---asfas dk', data);
          });
          // realm.close();
          resolve('DONE');
          // }
          console.log('CREATE createDataNew data', data);
        });
        // resolve('DONE');
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

export const EditDataNew = (item, id) => {
  return new Promise((resolve, reject) => {
    Realm.open({
      schema: [PasswordSchema, Accountchema],
      encryptionKey: key,
    })
      .then(realm => {
        console.log('itemitemitemitemitem', item);
        console.log('itemitemitemitemitem', id);
        realm.write(() => {
          const passwordEdit = realm
            .objects('Passwords')
            .filtered('id = ' + id);
          console.log('itemitemitemitemitem 3', passwordEdit[0]);
          passwordEdit[0].name = item.name;
          passwordEdit[0].website = item.webAddress;
          passwordEdit[0].accounts = [];

          item.accounts.map(itm => {
            let accou = {
              id: moment.utc().valueOf(),
              passwordId: id,
              account: itm.account,
              login: itm.login,
              password: itm.password,
              note: itm.note,
              lastUpdatedDate: moment.utc().valueOf(),
            };
            passwordEdit[0].accounts.push(accou);
            // console.log('data ---asfas dk', data);
          });
        });
        resolve('DONE');
      })
      .catch(error => {
        console.log('error', error);
        reject(error);
      });
  });
};

export const deleteAllData = () => {
  return new Promise((resolve, reject) => {
    Realm.open({
      schema: [PasswordSchema, Accountchema],
      encryptionKey: key,
    })
      .then(realm => {
        realm.write(() => {
          realm.deleteAll();
          realm.close();
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
  console.log('1o11919=====');
  return new Promise((resolve, reject) => {
    console.log('1o11919=1====');

    Realm.open({
      schema: [PasswordSchema, Accountchema],
      encryptionKey: key,
    })
      .then(realm => {
        console.log('1o11919=13====');

        realm.write(() => {
          console.log('1o11919=133====');

          const passwordSelect = realm
            .objects('Passwords')
            .filtered('id = ' + id);
          console.log('passwordSelectpasswordSelect', passwordSelect);
          realm.delete(passwordSelect);
          // realm.close();
          resolve('DONE');
        });
      })
      .catch(error => {
        console.log('error=====', error);
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
