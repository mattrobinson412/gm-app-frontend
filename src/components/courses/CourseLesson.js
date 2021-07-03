import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import graceMusicApi from "../../api/api";
import SinglePage from "../common/Document";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";


/** Show information about a lesson.
 * 
 * Users can mark a lesson finished upon completion.
 * 
 * CourseLessonList -> CourseLessonCard -> CourseLesson
 */

async function CourseLesson() {
    const { currentUser } = useContext(UserContext);
    const history = useHistory();
    const { courseName, lessonNumber } = useParams();

    const [Lesson, setCourseLesson] = useState(null);
    const [Course, setCourse] = useState(null);

    useEffect(function getCourseLessonsForUser() {
        async function getCourse() {
            setCourse(await graceMusicApi.getCourse(courseName));
        }
        getCourse();

        async function getCourseLesson() {
        setCourseLesson(await graceMusicApi.getLesson(courseName, lessonNumber));
        }
        getCourseLesson();
    }, [courseName, lessonNumber]);

    async function completeLesson(evt) {
        evt.preventDefault();
        let res = await graceMusicApi.createCourseLesson(currentUser.id, Course.id, Lesson.id, true);
        if (res.success) {
            history.push(`/courses/${courseName}`);
        }
        else {
            console.error(res.errors);
        }
    };

    if (!Lesson) return <LoadingSpinner />;

    return (
        <div>
            <h2>{Lesson.name}</h2>
            <SinglePage pdf={Lesson.sheet} />
            <p>{Lesson.sound}</p>
            <button onClick={completeLesson}>
                Complete Lesson
            </button>
        </div>
    );
}

export default CourseLesson;