import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button, ListItem, Image } from "react-native-elements";
import axios from "axios";
import { isEmpty, isArray, isNull } from "lodash";
import moment from "moment-timezone";
import tw from "tailwind-rn";
import * as ScreenOrientation from "expo-screen-orientation";

import Spinner from "../spinner";

const url =
  "https://ds04s2074b.execute-api.ap-east-1.amazonaws.com/api/heibai?all=true";

const Live = ({ navigation }) => {
  const [matches, setMatches] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
    const unsubscribe = navigation.addListener("focus", () => {
      changeScreenOrientation();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchMatches = () => {
    setIsLoading(true);
    setMatches([]);
    axios
      .get(url)
      .then(({ data }) => {
        setIsLoading(false);
        if (isArray(data) && !isEmpty(data)) {
          setMatches(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchMatches();
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <SafeAreaView style={tw(`flex-grow max-h-full mt-5`)}>
      <ScrollView>
        {isNull(matches) ? (
          <Text>無比賽</Text>
        ) : (
          matches.map((match, i) => {
            const { homeName, awayName, league, start, url } = match || {};
            const dt = moment(start);
            const time = dt.tz("Asia/Hong_Kong").format("ddd kk:mm");
            return (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => {
                  console.log({ url });
                  navigation.navigate("Player", {
                    url,
                  });
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>
                    <View
                      style={tw(
                        `flex flex-row w-full items-center justify-center`
                      )}
                    >
                      <Text>{homeName}</Text>
                      <Text style={tw(`mx-2`)}>對</Text>
                      <Text>{awayName}</Text>
                    </View>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {league} - {time}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Live;
