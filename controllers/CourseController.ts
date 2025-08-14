 import { get, onValue, ref, Unsubscribe } from "firebase/database";
   import { realtimeDB } from "../config/Firebase";
   import { Course } from "../models/Course";

   export const getCoursesRealtime = (callback: (courses: Course[]) => void): Unsubscribe => {
     const coursesRef = ref(realtimeDB, "courses");
     const unsubscribe = onValue(coursesRef, async (snapshot) => {
       const courses: Course[] = [];
       const enrollmentsRef = ref(realtimeDB, "enrollments");

       snapshot.forEach((child) => {
         const courseData = child.val();
         courses.push(
           new Course(
             child.key!,
             courseData.title,
             courseData.description,
             courseData.mentorId,
             courseData.startDate,
             courseData.chatGroupId,
             courseData.coverImage,
             courseData.status,
             courseData.likeCount,
             courseData.endDate
           )
         );
       });

       const enrollmentsSnapshot = await get(enrollmentsRef);
       const enrollments = enrollmentsSnapshot.val() || {};
       courses.forEach((course) => {
         let usedCount = 0;
         Object.values(enrollments).forEach((enrollment: any) => {
           if (enrollment.courseId === course.courseId) {
             usedCount++;
           }
         });
         (course as any).usedCount = usedCount;
       });

       callback(courses);
     });

     return unsubscribe; // Trả về hàm unsubscribe trực tiếp
   };

