// Smart Report: the page-by-page report (the CEO-approved revamp of the chat prototype), shown full screen.
// The report itself is the finished mockup from ~/smart_report_revamp/mockup, packed into src/reportHtml.ts with its
// fonts and images by scripts/sync_report.py, so the app works offline and every change ships as an OTA update.
// The page draws edge to edge and keeps clear of the notch and the home bar on its own (viewport-fit=cover, env()).
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { WebView, type WebViewNavigation } from 'react-native-webview';

import reportHtml from './src/reportHtml';

// The report's own address: page changes stay inside it (hash history), everything else leaves the app.
const BASE = 'https://smart-report.local/';
// The page's top light, so the status bar area and a pull past the top match the report.
const GROUND_TOP = '#EEF3F9';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  // never leave the splash up if the page is slow to say it has loaded
  useEffect(() => {
    const t = setTimeout(() => SplashScreen.hideAsync().catch(() => {}), 4000);
    return () => clearTimeout(t);
  }, []);

  // Phone numbers, WhatsApp and email (the help sheet) open in their own apps.
  const onRequest = (req: WebViewNavigation) => {
    const url = req.url;
    if (url.startsWith(BASE) || url.startsWith('about:') || url.startsWith('data:')) return true;
    Linking.openURL(url).catch(() => {});
    return false;
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <WebView
        source={{ html: reportHtml, baseUrl: BASE }}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={onRequest}
        onLoadEnd={() => SplashScreen.hideAsync().catch(() => {})}
        style={styles.web}
        // the page handles the safe areas itself
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        // swipe from the left edge goes back a page, as Back does
        allowsBackForwardNavigationGestures
        allowsLinkPreview={false}
        dataDetectorTypes="none"
        textZoom={100}
        setSupportMultipleWindows={false}
        overScrollMode="never"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: GROUND_TOP },
  web: { flex: 1, backgroundColor: GROUND_TOP },
});
