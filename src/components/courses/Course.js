import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import graceMusicApi from "../api/api";
import CourseLessonList from "./CourseLessonList";
import LoadingSpinner from "../common/LoadingSpinner";

/** Course Detail page.
 *
 * Renders information about Course, along with the jobs at that Course.
 *
 * Routed at /companies/:name
 *
 * Routes -> Course -> CourseLesson
 */

function Course() {
  const { name } = useParams();
  console.debug("Course", "name=", name);

  const [Course, setCourse] = useState(null);
  const [Lessons, setLessons] = useState(null);

  useEffect(function getCourseAndLessonsForUser() {
    async function getCourse() {
      setCourse(await graceMusicApi.getCourse(name));
    }
    getCourse();

    async function getLessons() {
        setLessons(await graceMusicApi.getLessons(Course.id));
    }
    getLessons();

  }, [name]);

  if (!Course) return <LoadingSpinner />;

  return (
      <div>
        <h2>{Course.name}</h2>
        <h4>Level <b>{Course.level}</b></h4>
        <CourseLessonList lessons={Lessons} course={course} />
      </div>
  );
}

export default Course;
