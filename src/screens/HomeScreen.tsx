import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loadDrafts} from '../store/draftsSlice';
import {RootState} from '../store/store';
import {Searchbar} from 'react-native-paper';


//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const drafts = useSelector((state: RootState) => state.drafts.drafts);

//   useEffect(() => {
//     const fetchDrafts = async () => {
//       const storedDrafts = await AsyncStorage.getItem('drafts');
//       if (storedDrafts) {
//         dispatch(loadDrafts(JSON.parse(storedDrafts)));
//       }
//     };
//     fetchDrafts();
//   }, []);

//   return (
//     <View style={styles.mainContainer}>
//       <View style={{margin: 15}}>
//         <View>
//           <Searchbar
//             placeholder="Search"
//             onChangeText={setSearchQuery}
//             value={searchQuery}
//             style={styles.searchbar}
//             iconColor="#4CAF50"
//             inputStyle={styles.input}
//             placeholderTextColor="#9e9e9e"
//           />
//         </View>
//         <View>
//           {/* <Button title="Create New Draft" /> */}
//           <TouchableOpacity
//             style={styles.addIconContainer}
//             onPress={() => navigation.navigate('EmailEditor')}>
//             <Image
//               source={require('../assets/email.png')}
//               style={styles.addIcon}
//             />
//           </TouchableOpacity>
//           <FlatList
//             data={drafts}
//             keyExtractor={item => item.id}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate('EmailEditor', {draft: item})
//                 }
//                 style={styles.mainCardContainer}>
//                 <Text style={styles.recipientText}>{item.recipient}</Text>
//                 <View style={styles.subjectStatusContainer}>
//                   <Text style={styles.subjectText}>{item.subject}</Text>
//                   <Text style={styles.statusText}>({item.status})</Text>
//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#ffff',
//   },
//   searchbar: {
//     borderRadius: 12,
//     elevation: 5,
//     backgroundColor: '#c1cad6',
//     marginBottom: 10,
//   },
//   input: {
//     fontSize: 16,
//     color: '#000',
//   },
//   addIcon: {
//     height: 40,
//     width: 40,
//     alignSelf: 'center',
//   },
//   addIconContainer: {
//     position: 'absolute',
//     bottom: -250,
//     right: 10,
//     backgroundColor: 'red',
//     height: 60,
//     width: 60,
//     justifyContent: 'center',
//     borderRadius: 99,
//   },
//   mainCardContainer: {
//     margin: 8,
//     padding: 10,
//     borderRadius: 10,
//     backgroundColor: '#ffff',
//     shadowColor: 'black',
//     shadowOffset: {width: 0, height: 6},
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//     width: '95%',
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignSelf: 'center',
//   },
//   recipientText: {
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   subjectText: {
//     fontSize: 14,
//     color: '#808080',
//   },
//   statusText: {
//     color: 'red',
//     fontSize: 15,
//   },
//   subjectStatusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
// });
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');


  const navigation = useNavigation();
  const dispatch = useDispatch();
  const drafts = useSelector((state: RootState) => state.drafts.drafts);
  const [data,setData] = useState(drafts)

  useEffect(() => {
    const fetchDrafts = async () => {
      const storedDrafts = await AsyncStorage.getItem('drafts');
      if (storedDrafts) {
        dispatch(loadDrafts(JSON.parse(storedDrafts)));
      }
    };
    fetchDrafts();
  }, []);

  useEffect(() => {
    if (drafts && drafts.length > 0) {
      setData(drafts); 
    }
  }, [drafts]);
  
  const onsearch = (text)=>{
    // let tempData = drafts.filter((item)=>{
    //       return item.recipient.toLowerCase().indexOf(text.toLowerCase())> -1
    // })
    // setData(tempData)
    setSearchQuery(text);
    if (text.trim() === '') {
      setData(drafts); // If search is cleared, show all drafts
    } else {
      const filteredData = drafts.filter((item) =>
        item.recipient.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredData);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{margin: 15, flex: 1}}>
        <Searchbar
          placeholder="Search"
          onChangeText={(text)=>onsearch(text)}
          // value={searchQuery}
          style={styles.searchbar}
          iconColor="#4CAF50"
          inputStyle={styles.input}
          placeholderTextColor="#9e9e9e"
        />
        
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('EmailEditor', { draft: item })}
              style={styles.mainCardContainer}
            >
              <Text style={styles.recipientText}>{item.recipient}</Text>
              <View style={styles.subjectStatusContainer}>
                <Text style={styles.subjectText}>{item.subject.substring(0,39).concat('...')}</Text>
                <Text style={styles.statusText}>({item.status})</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.addIconContainer}
        onPress={() => navigation.navigate('EmailEditor')}
      >
        <Image
          source={require('../assets/email.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffff',
    position: 'relative',  
  },
  searchbar: {
    borderRadius: 12,
    elevation: 5,
    backgroundColor: '#c1cad6',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  addIcon: {
    height: 40,
    width: 40,
    alignSelf: 'center',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 20,  
    right: 10,
    backgroundColor: 'red',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    zIndex: 10,  
  },
  mainCardContainer: {
    margin: 8,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffff',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: '95%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  recipientText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  subjectText: {
    fontSize: 14,
    color: '#808080',
  },
  statusText: {
    color: 'red',
    fontSize: 15,
  },
  subjectStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;


