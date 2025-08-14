import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Animated,
    ActivityIndicator,
    TextInput,
    Image,
} from "react-native";
import Header from "../components/Header";
import NavBar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import HackerNewsScreen from "../components/HackerNewsScreen";
import { getCoursesRealtime } from "../controllers/CourseController";
import { Course } from "../models/Course";
import { realtimeDB } from "../config/Firebase";
import { ref, get } from "firebase/database";

// Chia mảng thành các nhóm
const chunkArray = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

export default function HomeScreen() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [search, setSearch] = useState("");
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Lấy avatar từ Firebase
        const userRef = ref(realtimeDB, "users/user1/avatarUrl"); // TODO: lấy userId từ auth
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                setAvatarUrl(snapshot.val());
            }
        });

        // Lấy courses realtime
        const unsubscribe = getCoursesRealtime((data) => {
            setCourses(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const groupedData = chunkArray(courses, 4);

    return (
        <View style={styles.container}>
            <FlatList
                data={loading ? [] : groupedData}
                keyExtractor={(_, index) => index.toString()}
                horizontal={false}
                ListHeaderComponent={
                    <>
                        {/* Thanh tìm kiếm */}
                        <View style={styles.searchContainer}>
                            <Image
                                source={require("../images/icon_search.png")}
                                style={styles.searchIcon}
                            />
                            <TextInput
                                placeholder="Search..."
                                value={search}
                                onChangeText={setSearch}
                                style={styles.searchInput}
                            />
                        </View>

                        <Text style={styles.title}>Technology Courses..</Text>

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                style={{ marginTop: 20 }}
                            />
                        )}
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.page}>
                        <View style={styles.column}>
                            {item[0] && (
                                <CourseCard
                                    image={{ uri: item[0].coverImage }}
                                    title={item[0].title}
                                    subtitle={item[0].mentorId}
                                    usedCount={(item[0] as any).usedCount}
                                    starCount={item[0].likeCount}
                                />
                            )}
                            {item[2] && (
                                <CourseCard
                                    image={{ uri: item[2].coverImage }}
                                    title={item[2].title}
                                    subtitle={item[2].mentorId}
                                    usedCount={(item[2] as any).usedCount}
                                    starCount={item[2].likeCount}
                                />
                            )}
                        </View>
                        <View style={styles.column}>
                            {item[1] && (
                                <CourseCard
                                    image={{ uri: item[1].coverImage }}
                                    title={item[1].title}
                                    subtitle={item[1].mentorId}
                                    usedCount={(item[1] as any).usedCount}
                                    starCount={item[1].likeCount}
                                />
                            )}
                            {item[3] && (
                                <CourseCard
                                    image={{ uri: item[3].coverImage }}
                                    title={item[3].title}
                                    subtitle={item[3].mentorId}
                                    usedCount={(item[3] as any).usedCount}
                                    starCount={item[3].likeCount}
                                />
                            )}
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <View style={{ marginTop: 20, paddingBottom: 100 }}>
                        <Text style={styles.title}>News</Text>
                        <HackerNewsScreen />
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginStart: 15,
        marginTop: 20,
        marginBottom: 15,
        color: "black",
    },
    page: { flexDirection: "row", marginHorizontal: 10 },
    column: { flexDirection: "column", marginHorizontal: 5 },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        marginHorizontal: 15,
        marginTop: 10,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
        tintColor: "#888",
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
});
