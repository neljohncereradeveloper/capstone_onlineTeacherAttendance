import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Text, View } from '../components/Themed';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [response, setResponse] = useState<{ message: string }>();
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
    if (data) {
      setLoading(true);
      setScanned(true);
      setOpenScanner(false);
      fetch(`http://192.168.43.27:3005/scan-teacher/qrCode=${data}`)
        .then((res) => res.json())
        .then((_res) => {
          if (_res) {
            setResponse(_res as any);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log('scan-teacher error : ', err);
        });
    }
  };
  return (
    <View style={styles.container}>
      {response?.message && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <AntDesign
            style={styles.icon}
            name="checkcircle"
            size={60}
            color="green"
          />
          <Text style={{ fontSize: 24, fontWeight: '700' }}>
            {response?.message}
          </Text>
        </View>
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
      <Button
        title={`${
          openScanner ? 'Close Teacher Scanner' : 'Open Teacher Scanner'
        }`}
        color={`${openScanner ? 'red' : 'green'}`}
        onPress={() => {
          setResponse(undefined);
          setScanned(false);
          setOpenScanner((prev) => !prev);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
});
