import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";

interface CourseCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  usedCount: number;
  starCount: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ image, title, subtitle, usedCount, starCount }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.footer}>
          <Text style={styles.star}>⭐ {starCount}</Text>
          <Text style={styles.usage}>LEARNED {usedCount}</Text>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E2E",
    borderRadius: 12,
    overflow: "hidden",
    width: 180,
    margin: 10,
    height: 240,
  },
  image: {
    width: "100%",
    height: 120,
  },
  content: {
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#bbb",
    fontSize: 14,
    marginVertical: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  star: {
    color: "#fff",
    fontWeight: "bold",
  },
  usage: {
    color: "#888",
    fontSize: 12,
  },
});