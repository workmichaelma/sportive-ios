import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Player({ route, navigation }) {
  const { url } = route.params || {};

  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
    }
    const unsubscribe = navigation.addListener("focus", () => {
      changeScreenOrientation();
    });

    return unsubscribe;
  }, [navigation]);

  return !url ? null : (
    <WebView
      source={{ uri: url, headers: {} }}
      userAgent="macOS"
      mediaPlaybackRequiresUserAction={true}
      scrollEnabled={false}
      allowsFullscreenVideo={true}
      javaScriptEnabled={true}
      allowsInlineMediaPlayback={true}
      scalesPageToFit={true}
      contentMode="desktop"
    />
    // <WebView
    //   userAgent="Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
    //   scalesPageToFit={true}
    //   bounces={false}
    //   javaScriptEnabled={true}
    //   allowsInlineMediaPlayback="true"
    //   allowsInlineMediaPlayback={true}
    //   style={{ height: 375, width: 1024 }}
    //   originWhitelist={["*"]}
    //   useWebKit={true}
    //   contentMode="desktop"
    //   mixedContentMode="compatibility"
    //   mediaPlaybackRequiresUserAction={true}
    //   injectedJavaScript={debugging}
    //   onMessage={onMessage}
    //   scalesPageToFit={false}
    //   // https://live01-ali.myeogm.com/live/streamhd61922.flv?auth_key=1637685600000-e7452ae47c924651b8756e114b53fe23-0-a834a097b34d0004e0228be9d2a41a6f
    //   source={{
    //     html: `
    //               <!DOCTYPE html>
    //               <html>
    //                 <head></head> // <--add header styles if needed
    //                 <body>
    //                   <div id="baseDiv">
    //                   <iframe
    //                     src=${url}
    //                     title="iframe Example 1"
    //                     width="1024px"
    //                     height="375px"
    //                   ></iframe></div> //<--- add your iframe here
    //                 </body>
    //               </html>
    //         `,
    //   }}
    //   automaticallyAdjustContentInsets={false}
    // />
  );
}
