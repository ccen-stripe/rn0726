import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, { useState, useCallback } from 'react';
import {
  useStripeIdentity,
  IdentityVerificationSheetOptions,
} from '@stripe/stripe-identity-react-native';

import logo from './assets/icon.png';

export default function App() {


  const [options, setOptions] = useState<VerificationSessionOptions>({
    requireMatchingSelfie: false,
    requireIdNumber: false,
    allowedTypes: {
      ['driving_license']: true,
      ['id_card']: true,
      ['passport']: true,
    },
    requireLiveCapture: false,
  });

  const fetchOptions = useCallback(async () => {
    return {
      sessionId: 'vs_1M73GDGMZYGNxJkBXchPkSD1',
      ephemeralKeySecret: 'ek_live_YWNjdF8xSDM0ZFhHTVpZR054SmtCLHRJc21CVEJYVDl5Y1lMNnpTVnBlVmhidVVLcVhyUlM_00uOuclWPR',
      brandLogo: Image.resolveAssetSource(logo),
    };
  }, [options]);

  const { status, present, loading } = useStripeIdentity(fetchOptions);

  const handlePress = useCallback(() => {
    present();
  }, [present]);

  return (
    <View style={styles.container}>
      <Text>Hellfdo</Text>
      <Button
        testID="verify-btn"
        title="Verify Identity"
        onPress={handlePress}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
