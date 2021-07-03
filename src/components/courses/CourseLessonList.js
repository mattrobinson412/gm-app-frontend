import React from "react";
import CourseLessonCard from "./CourseLessonCard";
import { Link } from "react-router-dom"; 

/** Show list of lesson cards.
 *
 * Used by Course to list lessons.
 *
 */

function CourseLessonList({ lessons, course }) {
    console.debug("CourseLessonList", "lessons=", "course=", lessons, course);

    return (
        <div className="CourseLessonList">
            {lessons.map(lesson => (
                <Link className="CourseCard" to={`/courses/${course.name}/${lesson.number}`}>
                    <CourseLessonCard
                        lesson={lesson}
                    />
                </Link>
            ))}
        </div>
    );
}

export default CourseLessonList;
