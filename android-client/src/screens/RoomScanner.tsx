import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Text, View } from '../components/Themed';
import FormScanner from '../components/roomScanner/form';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  set_classroomin_false,
  set_classroomin_true,
} from '../redux/slice/login';
import { set_classroom } from '../redux/slice/classroom';
import produce from 'immer';

interface DataProps {
  data: {
    classId: string;
  };
  message: string;
  logout: boolean;
  login: boolean;
}
interface teacherProps {
  payload: {
    idNumber: string;
    teacher: string;
    qrCode: string;
  };
}

export default function RoomScannerScreen() {
  const dt = new Date();
  const time = dt.toLocaleTimeString('us', {
    hour: '2-digit',
    hour12: true,
    minute: 'numeric',
    timeZone: 'Asia/Manila',
  });
  const timeSplit = time.split(':');
  const _currHour = timeSplit[0];
  const currHour =
    parseInt(_currHour) > 12 ? parseInt(_currHour) - 12 : parseInt(_currHour);
  const currMinutes = timeSplit[1];
  const teacher: any = useAppSelector((state) => state.teacher.teacher);
  const _classroom: any = useAppSelector((state) => state.classroom.classroom);
  const isIn = useAppSelector((state) => state.login.isClassRoomIn);
  const dispatch = useAppDispatch();
  const [qr, setQr] = useState<string | undefined>();
  const [subjectValues, setSubjectValues] = useState<any[]>([
    {
      label: 'Choose',
      values: null,
    },
  ]);
  const [subject, setSubject] = useState<string | undefined>();
  const [subjectTimeValues, setSubjectTimeValues] = useState<any[]>([
    {
      label: 'Choose',
      values: null,
    },
  ]);
  const [subjectTime, setSubjectTime] = useState<string | undefined>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState<boolean>();
  const [openScanner, setOpenScanner] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    const { data } = scanningResult;
    const qrData = data.split(',');
    const classRoom = qrData[0];
    const status = qrData[1];
    setScanned(true);
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
      .then(async (_data: any) => {
        if (_data.success) {
          const hasClass = _data.data?.some((val: any) => {
            if (classRoom === val.classRoom && val.active === 'TRUE') {
              // if qrcode is valid
              if (data) {
                // if is teacher is already IN and tries to scan again
                if (status === 'IN' && isIn) {
                  setScanned(true);
                  setOpenScanner(false);
                  setOpenForm(false);
                  Alert.alert('Failed', 'Class is already started...');
                }
                // if teacher is not in and tries to scan OUT
                if (status === 'OUT' && !isIn) {
                  setScanned(true);
                  setOpenScanner(false);
                  setOpenForm(false);
                  Alert.alert(
                    'Failed',
                    'Scan Classroom QR-IN first, before proceeding..'
                  );
                }
                // teacher scanning OUT and is already IN
                if (status === 'OUT' && isIn) {
                  setQr(data);
                  setScanned(true);
                  setOpenForm(true);
                  setOpenScanner(false);
                }
                // teacher scanning IN And not yet IN
                if (status === 'IN' && !isIn) {
                  setSubjectValues(
                    produce((draft) => {
                      draft.push({
                        label: val.subject,
                        value: val.subject,
                      });
                    })
                  );
                  setSubjectTimeValues(
                    produce((draft) => {
                      draft.push({
                        label: val.subjectTime,
                        value: val.subjectTime,
                      });
                    })
                  );

                  setQr(data);
                  setScanned(true);
                  setOpenForm(true);
                  setOpenScanner(false);
                }
                return true;
              }
            }
            return false;
          });
          if (!hasClass) {
            setScanned(true);
            setOpenScanner(false);
            Alert.alert(
              'Failed',
              'You dont have any class in this room for todays schedule.'
            );
          }
        }
      })
      .catch((error) => {
        console.log('login error : ', error);
      });
  };
  const handleForm = () => {
    //  { teacher, idNumber, classRoom, subject, subjectTime, status }
    setOpenForm(false);
    setLoading(true);
    if (subject === undefined || subject === null) {
      console.log('subject : ', subject);
      Alert.alert('Invalid', 'Please Choose Subject');
      setLoading(false);
      return;
    }
    if (subjectTime === undefined || subjectTime === null) {
      console.log('subjectTime : ', subjectTime);
      Alert.alert('Invalid', 'Please Choose Time');
      setLoading(false);
      return;
    }
    const subjectTimeSplit = subjectTime?.split('-');
    const subjectTimeIn = subjectTimeSplit?.[0];
    const subjectTimeInSplit = subjectTimeIn?.split(':');
    const subjectHour = subjectTimeInSplit && subjectTimeInSplit[0];
    // const subjectMinutes = subjectTimeInSplit && subjectTimeInSplit[1];

    if (qr) {
      const qrData = qr.split(',');
      const classRoom = qrData[0];
      const status = qrData[1];
      const remarks =
        (status === 'IN' &&
          currHour.toString() === subjectHour &&
          parseInt(currMinutes) < 15) ||
        currHour < parseInt(subjectHour)
          ? 'present'
          : currHour.toString() === subjectHour && parseInt(currMinutes) > 15
          ? 'late'
          : currHour > parseInt(subjectHour)
          ? 'ended'
          : null;

      if (remarks === 'ended' || null) {
        Alert.alert('Failed', 'Schedule for this class was already ended.');
      } else {
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            classId: status === 'IN' ? '' : _classroom.payload.classId,
            teacher: teacher.payload.teacher,
            idNumber: teacher.payload.idNumber,
            classRoom,
            subject,
            subjectTime,
            status,
            remarks,
          }),
        };
        fetch(
          `https://classroom-attendance-server-1.herokuapp.com/api/scan/classroom`,
          options
        )
          .then((response) => response.json())
          .then((data: any) => {
            if (data.login) {
              setLoading(false);
              dispatch(set_classroomin_true());
              dispatch(
                set_classroom({
                  date: data.data.date,
                  classId: data.data.classId,
                  timeIn: data.data.classIn,
                  room: classRoom,
                  subject: subject,
                  subjectTime,
                  status: 'Class is on going..',
                })
              );
              Alert.alert('Success', 'Class Started.');
            }
            if (data.logout) {
              setLoading(false);
              dispatch(set_classroomin_false());
              dispatch(
                set_classroom({
                  room: classRoom,
                  subject: subject,
                  subjectTime,
                  status: 'Class ends.',
                })
              );
              Alert.alert('Success', 'Class ends.');
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log('login error : ', error);
          });
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Scanner</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {openForm && (
        <FormScanner
          subjectValues={subjectValues}
          subject={isIn ? _classroom.payload.subject : subject}
          setSubject={setSubject}
          subjectTimeValues={subjectTimeValues}
          subjectTime={isIn ? _classroom.payload.subjectTime : subjectTime}
          setSubjectTime={setSubjectTime}
          handleSubmit={() => handleForm()}
        />
      )}

      {openScanner ? (
        <Camera
          style={styles.camera}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
        ></Camera>
      ) : null}
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 10, marginBottom: 10 }}
          size="large"
          color="#0000ff"
        />
      )}
      {!openForm && (
        <View
          style={{
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginVertical: 5,
          }}
        >
          <Button
            title={`${openScanner ? 'Close Scanner' : 'Open Scanner'}`}
            color={`${openScanner ? 'red' : 'green'}`}
            onPress={() => {
              setScanned(false);
              setOpenScanner((prev) => !prev);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 1,
    width: '80%',
  },
});
