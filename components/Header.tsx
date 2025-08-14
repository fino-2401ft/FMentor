import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface HeaderProps {
  userAvatarUri: string; // lấy từ Firebase
}

const Header: React.FC<HeaderProps> = ({ userAvatarUri }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoGroup}>
        <Image
          source={require("../images/logo.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Image
          source={require("../images/appname.png")}
          style={{ width: 100, height: 40, marginLeft: 4 }}
          resizeMode="contain"
        />
      </View>

      {/* Avatar */}
      <Image
        source={{ uri: userAvatarUri }}
        style={styles.avatar}
        resizeMode="cover"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 16,

    elevation: 3,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
});
