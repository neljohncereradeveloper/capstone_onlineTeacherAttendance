import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDown from '../../shared/dropDown';

interface Props {
  subjectValues: any[];
  subjectTimeValues: any[];
  subject: string | undefined;
  setSubject: React.Dispatch<React.SetStateAction<string | undefined>>;
  subjectTime: string | undefined;
  setSubjectTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleSubmit: () => void;
}
//
const FormScanner: React.FC<Props> = ({
  subjectValues,
  subjectTimeValues,
  subject,
  setSubject,
  subjectTime,
  setSubjectTime,
  handleSubmit,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          width: '80%',
          borderColor: 'gray',
          borderWidth: 1,
          padding: 20,
        }}
      >
        <Text style={styles.text}>Subject</Text>
        <DropDown
          state={subject}
          setState={setSubject}
          values={subjectValues}
        />

        <Text style={styles.text}>Time</Text>
        <DropDown
          state={subjectTime}
          setState={setSubjectTime}
          values={subjectTimeValues}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormScanner;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: 'blue',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
