import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import graceMusicApi from "../../api/api";
import CourseLessonList from "./CourseLessonList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Course Detail page.
 *
 * Renders information about Course, along with the lessons at that Course.
 *
 * Routed at /courses/:name
 *
 * Routes -> Course -> CourseLesson
 */

function Course() {
  const { name } = useParams();
  console.debug("Course", "name=", name);

  const [course, setCourse] = useState([]);

  useEffect(function getCoursesOnMount() {
    console.debug("Course useEffect getCoursesOnMount");
    grabCourse(name);
  }, []);

  async function grabCourse(name) {
      let res = await graceMusicApi.getCourse(name);
      setCourse(course.push(res));
    }
  

  if (!course) return <LoadingSpinner />;

  return (
    <div>
      <h2>{course.name}</h2>
      <CourseLessonList />
    </div>
  );
}

export default Course;
