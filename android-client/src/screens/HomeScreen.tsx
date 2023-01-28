import * as React from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../../types";
import { useAppDispatch, useAppSelector } from "../redux/store";
import produce from "immer";
import { getDayString } from "../helper/getDayString";
import { delete_classroom } from "../redux/slice/classroom";
import { set_classroomin_false } from "../redux/slice/login";
import { useGetTeacherClass } from "../hooks/useGetTeacherClass";
import { useGetClassRoomAttendance } from "../hooks/useGetClassRoomAttendance";
import { formatDate } from "../helper/formatDate";

const windowWidth = Dimensions.get("window").width;

interface ClassroomProps {
  payload: {
    room: string;
    status: string;
    subject: string;
    subjectTime: string;
  };
}

interface ClassesProps {
  id: string;
  classRoom: string;
  subject: string;
  subjectTime: string;
  schedule?: string;
}

interface teacherProps {
  payload: {
    idNumber: string;
    teacher: string;
    qrCode: string;
  };
}
export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [refresh, setRefresh] = React.useState(false);
  const _date = formatDate(new Date());
  const teacher = useAppSelector((state) => state.teacher.teacher);
  console.log("teacher", teacher);
  const { data: dataClasses } = useGetTeacherClass(teacher);
  const { data: classRoomAttendance } = useGetClassRoomAttendance({
    teacher,
    refresh,
  } as any);

  const absenses = classRoomAttendance.filter(
    (row) => row.remarks === "absent" && row.date === _date
  );
  const lates = classRoomAttendance.filter(
    (row) => row.remarks === "late" && row.date === _date
  );
  const dispatch = useAppDispatch();
  const [classes, setClasses] = React.useState<ClassesProps[]>([]);
  const classroom = useAppSelector(
    (state) => state.classroom.classroom as ClassroomProps
  );

  const weekday = getDayString();

  // FUNCTIONS
  // #1
  const setClassesData = () => {
    setClasses([]);
    dataClasses.map((data: ClassesProps) => {
      const scheds = data?.schedule?.split(",");
      scheds?.map((sched: string) => {
        if (weekday === sched) {
          setClasses(
            produce((draft) => {
              draft.push({
                id: data.id,
                classRoom: data.classRoom,
                subject: data.subject,
                subjectTime: data.subjectTime,
              });
            })
          );
        }
      });
    });
  };
  // USEEFFECT
  React.useEffect(() => {
    setClassesData();
  }, [refresh]);

  const reset = () => {
    dispatch(delete_classroom());
    dispatch(set_classroomin_false());
    // if (classroom?.payload?.status === undefined) {
    //   return;
    // }
    // if (classroom?.payload?.status === 'Class ends.') {
    //   dispatch(delete_classroom());
    //   dispatch(set_classroomin_false());
    // } else {
    //   Alert.alert('Class', 'Class in ongoing cannot clear...');
    // }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            width: windowWidth - 60,
            backgroundColor: "yellow",
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <Text style={[styles.titleClasses, { color: "black" }]}>
            On Going Classes
          </Text>
          <TouchableOpacity style={styles.clear} onPress={() => reset()}>
            <Text style={{ color: "black" }}>Clear</Text>
          </TouchableOpacity>
          <View style={styles.containerTodayClasses}>
            {classroom.payload ? (
              <View style={styles.containerTodayClassesSubject}>
                <Text>{classroom.payload.room}</Text>
                <Text> {classroom.payload.status}</Text>
                <Text>
                  {`${classroom.payload.subject}  ${classroom.payload.subjectTime}`}
                </Text>
              </View>
            ) : (
              <View style={styles.containerTodayClassesSubject}>
                <Text>None</Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            width: windowWidth - 60,
            backgroundColor: "green",
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <Text style={styles.titleClasses}>
            Todays Classes : {classes.length}
          </Text>
          <TouchableOpacity
            style={styles.refresh}
            onPress={() => setRefresh((prev) => !prev)}
          >
            <Text style={{ color: "white" }}>Refresh</Text>
          </TouchableOpacity>
          <View style={styles.containerTodayClasses}>
            {classes.length !== 0 ? (
              classes.map((data: ClassesProps) => (
                <View style={styles.containerTodayClassesSubject} key={data.id}>
                  <Text>{data.classRoom}</Text>
                  <Text>{data.subject}</Text>
                  <Text>{data.subjectTime}</Text>
                </View>
              ))
            ) : (
              <View style={styles.containerTodayClassesSubject}>
                <Text>No Class Today</Text>
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            width: windowWidth - 60,
            backgroundColor: "gray",
            padding: 10,
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <Text style={styles.titleClasses}>Todays Lates : {lates.length}</Text>
          <TouchableOpacity
            style={styles.refresh}
            onPress={() => setRefresh((prev) => !prev)}
          >
            <Text style={{ color: "white" }}>Refresh</Text>
          </TouchableOpacity>
          <View style={styles.containerTodayClasses}>
            {lates.length !== 0 ? (
              lates.map((data: ClassesProps, index) => (
                <View style={styles.containerTodayClassesSubject} key={index}>
                  <Text>{data.classRoom}</Text>
                  <Text>{data.subject}</Text>
                  <Text>{data.subjectTime}</Text>
                </View>
              ))
            ) : (
              <View style={styles.containerTodayClassesSubject}>
                <Text>None</Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            width: windowWidth - 60,
            backgroundColor: "red",
            padding: 10,
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <Text style={styles.titleClasses}>
            Todays Absenses : {absenses.length}
          </Text>
          <TouchableOpacity
            style={styles.refresh}
            onPress={() => setRefresh((prev) => !prev)}
          >
            <Text style={{ color: "white" }}>Refresh</Text>
          </TouchableOpacity>
          <View style={styles.containerTodayClasses}>
            {absenses.length !== 0 ? (
              absenses.map((data: ClassesProps, index) => (
                <View style={styles.containerTodayClassesSubject} key={index}>
                  <Text>{data.classRoom}</Text>
                  <Text>{data.subject}</Text>
                  <Text>{data.subjectTime}</Text>
                </View>
              ))
            ) : (
              <View style={styles.containerTodayClassesSubject}>
                <Text>None</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerTodayClassesSubject: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    borderRadius: 5,
  },
  containerTodayClasses: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleClasses: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 20,
    // marginLeft: 20,
  },
  refresh: {
    marginBottom: 20,
    marginTop: 10,
    // marginLeft: 20,
  },
  clear: {
    marginBottom: 20,
    marginTop: 10,
  },
  room: {
    fontSize: 16,
    marginVertical: 15,
  },
  status: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subject: {
    fontSize: 20,
  },
});
