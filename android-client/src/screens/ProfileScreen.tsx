import * as React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { set_loggedin_false } from '../redux/slice/login';
import { useGetClassRoomAttendance } from '../hooks/useGetClassRoomAttendance';

interface teacherProps {
  payload: {
    idNumber: string;
    teacher: string;
    qrCode: string;
  };
}

const windowWidth = Dimensions.get('window').width;

export default function ProfileScreen() {
  const [refresh, setRefresh] = React.useState(false);
  const dispatch = useAppDispatch();
  const [classes, setClasses] = React.useState<any[]>([]);
  const teacher = useAppSelector((state) => state.teacher.teacher);
  const { data: classRoomAttendance } = useGetClassRoomAttendance({
    teacher,
    refresh,
  } as any);
  const absenses = classRoomAttendance.filter(
    (row) => row.remarks === 'absent'
  );
  const lates = classRoomAttendance.filter((row) => row.remarks === 'late');

  React.useEffect(() => {
    fetchClassess();
  }, []);

  const fetchClassess = () => {
    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    fetch(
      `https://classroom-attendance-server-1.herokuapp.com/api/class/teacher/${
        (teacher as teacherProps).payload.idNumber
      }`,
      options
    )
      .then((response) => response.json())
      .then(async (data: any) => {
        if (data.success) {
          setClasses(data.data);
        }
      })
      .catch((error) => {
        console.log('login error : ', error);
      });
  };

  const signOut = () => {
    Alert.alert(
      'Exit',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(set_loggedin_false());
          },
        },
      ],

      { cancelable: false }
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableHighlight
          style={[
            styles.profileImgContainer,
            { borderColor: 'green', borderWidth: 1 },
          ]}
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            }}
            style={styles.profileImg}
          />
        </TouchableHighlight>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          {(teacher as teacherProps).payload.teacher}
        </Text>
        <Text style={{ fontSize: 10, fontWeight: '400', marginLeft: 10 }}>
          {(teacher as teacherProps).payload.idNumber}
        </Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View style={styles.containerTotals}>
          <View style={styles.containerClasses}>
            <Text style={{ color: 'white' }}>All Class</Text>
            <Text style={{ color: 'white' }}>
              {classes ? classes.length : 0}
            </Text>
          </View>
          <View style={styles.containerAbsenses}>
            <Text style={{ color: 'white' }}>Absenses</Text>
            <Text style={{ color: 'white' }}>
              {absenses ? absenses.length : 0}
            </Text>
          </View>
          <View style={styles.containerLates}>
            <Text style={{ color: 'white' }}>Lates</Text>
            <Text style={{ color: 'white' }}>{lates ? lates.length : 0}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOut} onPress={() => signOut()}>
          <Text style={{ fontSize: 10, color: 'white' }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 30,
    alignItems: 'center',
  },
  containerTotals: {
    flexDirection: 'row',
    width: windowWidth - 60,
    height: 70,
  },
  containerClasses: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
  },
  containerAbsenses: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  containerLates: {
    flex: 1,
    backgroundColor: 'gray',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    letterSpacing: 2,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profileImgContainer: {
    marginLeft: 8,
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    overflow: 'hidden',
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  changePassword: {
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  signOut: {
    alignSelf: 'flex-start',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
