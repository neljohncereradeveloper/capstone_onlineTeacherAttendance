import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppSelector } from '../redux/store';

interface teacherProps {
  payload: {
    idNumber: string;
    teacher: string;
    qrCode: string;
  };
}

const windowWidth = Dimensions.get('window').width;

export default function ActivityLogScreen() {
  const [refresh, setRefresh] = React.useState(false);
  const [dataLogs, setDataLogs] = React.useState<any[]>([]);
  const teacher = useAppSelector((state) => state.teacher.teacher);
  const fetchLogs = () => {
    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    fetch(
      `https://classroom-attendance-server-1.herokuapp.com/api/logs/${
        (teacher as teacherProps).payload.idNumber
      }`,
      options
    )
      .then((response) => response.json())
      .then(async (data: any) => {
        if (data.success) {
          setDataLogs(data.data);
        }
      })
      .catch((error) => {
        console.log('login error : ', error);
      });
  };

  React.useEffect(() => {
    fetchLogs();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activty Log Screen</Text>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={() => fetchLogs()}>
        <Text>Refresh</Text>
      </TouchableOpacity>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        horizontal={false}
        keyExtractor={(dataLogs) => dataLogs.id}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 20,
        }}
        data={dataLogs}
        renderItem={({ item, index }) => {
          const _message = item.message.split('on');
          return (
            <View style={[styles.containerLogs]}>
              <View style={styles.containerDate}>
                <Text style={{ fontSize: 12 }}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
                <Text style={{ fontSize: 10 }}>
                  {new Date(item.date).toLocaleTimeString()}
                </Text>
              </View>
              <View>
                <Text>{item.action}</Text>
                <Text style={{ fontSize: 10 }}>{_message[0]}</Text>
                <Text style={{ fontSize: 10 }}>{_message[1]}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  containerLogs: {
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: windowWidth - 60,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  containerDate: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
