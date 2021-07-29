import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import graceMusicApi from "../../api/api";
import SinglePage from "../common/Document";
import LoadingSpinner from "../common/LoadingSpinner";


/** Show information about a lesson.
 * 
 * Users can mark a lesson finished upon completion.
 * 
 * CourseLessonList -> CourseLessonCard -> CourseLesson
 */

function CourseLesson() {
    const history = useHistory();
    const { name, number } = useParams();

    console.log(name, number);

    const [lesson, setCourseLesson] = useState(null);

    useEffect(function getCourseLessonsForUser() {
        getCourse(name);
    }, []);

    async function getCourse(name) {
        let res = await graceMusicApi.getCourse(name);
        grabLesson(res.id, number);
    }

    async function grabLesson(courseId, lessonNumber) {
        let res = await graceMusicApi.getLesson(courseId, lessonNumber);
        setCourseLesson(res);
        }

    async function completeLesson(evt) {
        evt.preventDefault();
        history.push(`/courses/${name}`);
    };

    if (!lesson) return <LoadingSpinner />;
    console.log(lesson);

    return (
        <div>
            {lesson ? (
            <div>
                <h2>{lesson.name}</h2>
                <SinglePage pdf={lesson.sheet} />
                <p>{lesson.sound}</p>
                <button onClick={completeLesson}>
                    Complete Lesson
                </button>
            </div>
            
            ) : (
                <p>Sorry, no lesson was found!</p>
            )}
        </div>
        
    )
            
            
        
    ;
}

export default CourseLesson;