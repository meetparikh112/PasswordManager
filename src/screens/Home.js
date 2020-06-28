import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getAllData} from './../db/operations';
import {
  Card,
  Title,
  Paragraph,
  TouchableRipple,
  FAB,
  withTheme,
} from 'react-native-paper';
import moment from 'moment';
import {Ripple, Center} from './Center';

function Home(props) {
  const {navigation} = props;
  const [passwords, SetPasswords] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getAllData()
        .then(data => {
          SetPasswords(data);
        })
        .catch(error => {
          console.log(error);
        });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // SetPasswords([]);
      };
    }, []),
  );

  //single Card Item
  const SingleItem = item => {
    return (
      <>
        <Ripple
          rippleColor={props.theme.colors.primary}
          onPress={() =>
            navigation.navigate('HelloForm', {
              item: item.item,
              createFlag: 0,
            })
          }>
          <TouchableRipple
            // style={{zIndex: 999}}
            rippleColor={props.theme.colors.primary}
            onPress={() =>
              navigation.navigate('HelloForm', {
                item: item.item,
                createFlag: 0,
              })
            }>
            <Card
              style={{
                borderBottomColor: props.theme.colors.primary,
                borderBottomWidth: 1,
                marginBottom: 3,
                marginTop: 3,
                margin: 7,
                borderRadius: 10,
              }}>
              <Card.Content>
                <Title>{item.item.name.substring(0, 30)}</Title>
                <Paragraph>{item.item.website.substring(0, 85)}</Paragraph>
                <Paragraph
                  style={{
                    textAlign: 'right',
                    alignSelf: 'stretch',
                    color: 'gray',
                  }}>
                  No of Accounts: {item.item.accountsNew.length}
                </Paragraph>
              </Card.Content>
            </Card>
          </TouchableRipple>
        </Ripple>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {passwords.length > 0 ? (
        <FlatList
          data={passwords}
          renderItem={({item}) => (
            <SingleItem item={item} key={item.id.toString()} />
          )}
        />
      ) : (
        <Center>
          <Text>No Passwords</Text>
        </Center>
      )}

      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          // borderWidth: 2,
          // borderColor: props.theme.colors.primary,
        }}
        large
        icon="plus"
        color={props.theme.colors.primary}
        backgroundColor={props.theme.colors.primary}
        onPress={() =>
          navigation.navigate('HelloForm', {item: 'No-Item', createFlag: 1})
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 60,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1',
  },
  card: {
    height: 80,
    borderRadius: 10,
    backgroundColor: '#101010',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#ffd700',
    marginBottom: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default withTheme(Home);
