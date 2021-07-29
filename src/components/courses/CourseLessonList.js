import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseLessonCard from "./CourseLessonCard";
import { Link } from "react-router-dom"; 
import graceMusicApi from "../../api/api";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show list of lesson cards.
 *
 * Used by Course to list lessons.
 *
 */

function CourseLessonList() {
    const { name } = useParams();
    console.debug("CourseLessonList", "name=", name);

    const [course, setCourse] = useState([]);
    const [lessons, setLessons] = useState(null);

    useEffect(function getCoursesAndLessonsOnMount() {
        console.debug("Course useEffect getCoursesAndLessonsOnMount");
        grabCourse(name);
    }, []);

    async function grabCourse(name) {
        let res = await graceMusicApi.getCourse(name);
        setCourse(course.push(res));
        console.log(course);
        grabLessons(res.id);
    };

    async function grabLessons(courseId) {
        let res = await graceMusicApi.getLessons(courseId);
        setLessons(res);
    };
    
    if (!lessons) return <LoadingSpinner />;
    console.log(lessons);

    return (
        <div className="CourseLessonList">
            {lessons.map(lesson => (
                <Link className="LessonCard" to={`/courses/${name}/${lesson.number}`}>
                    <CourseLessonCard
                        lessonName={lesson.name} lessonNumber={lesson.number}
                    />
                </Link>
            ))}
        </div>
    );
}

export default CourseLessonList;
