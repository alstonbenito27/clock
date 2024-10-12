import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [timerHours, setTimerHours] = useState('0');
  const [timerMinutes, setTimerMinutes] = useState('0');
  const [timerSeconds, setTimerSeconds] = useState('0');
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [startPopup, setStartPopup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      if (timerRunning) {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 1);
        } else {
          setTimerRunning(false);
          setStartPopup(false);
          setShowPopup(true);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, remainingTime]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const startTimer = () => {
    const totalSeconds =
      parseInt(timerHours, 10) * 3600 + parseInt(timerMinutes, 10) * 60 + parseInt(timerSeconds, 10);
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
      return;
    }
    setTimerRunning(true);
    setRemainingTime(totalSeconds);
    setStartPopup(true);
    toggleModal();
  };

  const stopTimer = () => {
    setTimerRunning(false);
    setTimerHours('0');
    setTimerMinutes('0');
    setTimerSeconds('0');
  };

  const closePopup = () => {
    setShowPopup(false);
    setStartPopup(false);
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <View style={styles.header}>
        <Text style={[styles.timeText, isDarkMode && styles.darkTimeText, styles.clockMargin]}>
          {currentTime}
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttonText}>Set Timer</Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Timer</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Hours</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={timerHours}
              onChangeText={(text) => setTimerHours(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Minutes</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={timerMinutes}
              onChangeText={(text) => setTimerMinutes(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Seconds</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={timerSeconds}
              onChangeText={(text) => setTimerSeconds(text)}
            />
          </View>
          <TouchableOpacity style={styles.modalButton} onPress={startTimer}>
            <Text style={styles.buttonText}>Start Timer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={showPopup}>
        <View style={styles.popupContent}>
          <Text style={styles.popupText}>{startPopup ? 'Timer has started!' : 'Timer is over!'}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#f0ffff',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 24,
  },
  darkTimeText: {
    color: 'white',
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputLabel: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  modalButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 10,
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
});
