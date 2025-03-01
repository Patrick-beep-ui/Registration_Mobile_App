import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSession } from '../context/SessionContext';

const SessionTimer = () => {
  const { session } = useSession();
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    if (!session || !session.sessionStart) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - session.sessionStart) / 1000);
      setSecondsElapsed(elapsed);
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [session]);

  if (!session) return null;

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>Session Time: {secondsElapsed} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    margin: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SessionTimer;
