import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserType } from "../UserContext";
import axios from "axios";

const ThreadScreen = () => {
  const [content, setContent] = useState("");
  const { userId, setUserId } = useContext(UserType);

  const handlePostSubmit = () => {
    const postData = {
      userId,
    };
    if (content) {
      postData.content = content;
    }

    axios
      .post("http://localhost:4000/create-post", postData)
      .then((response) => {
        setContent("");
      })
      .catch((error) => {
        console.log("error creating post", error);
      });
  };
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
          }}
        />
        <Text>Manasseh Ameyow</Text>
      </View>
      <View style={{ flexDirection: "row", marginLeft: 10 }}>
        <TextInput
          value={content}
          onChangeText={(text) => setContent(text)}
          placeholder="Type your message..."
          placeholderTextColor={"black"}
          multiline
        />
      </View>

      <View style={{ marginTop: 20 }} />
      <Button onPress={handlePostSubmit} title="Share Post" />
    </SafeAreaView>
  );
};

export default ThreadScreen;

const styles = StyleSheet.create({});
