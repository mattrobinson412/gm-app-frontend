import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import graceMusicApi from "../api/api";
import CourseCard from "./CourseCard";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show page with list of courses.
 *
 * On mount, loads courses from API.
 * Re-loads filtered courses on submit from search form.
 *
 * This is routed to at /courses
 *
 */

function CourseList() {
  console.debug("CourseList");

  const [courses, setCourses] = useState(null);

  useEffect(function getCoursesOnMount() {
    console.debug("CourseList useEffect getCoursesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads courses. */
  async function search(name) {
    let courses = await graceMusicApi.getCourses(name);
    setCourses(courses);
  }

  if (!courses) return <LoadingSpinner />;

  return (
      <div>
        <SearchForm searchFor={search} />
        {courses.length
            ? (
                <div className="CourseList-list">
                  {courses.map(c => (
                      <CourseCard
                          name={c.name}
                          level={c.level}
                      />
                  ))}
                </div>
            ) : (
                <p>Sorry, no results were found!</p>
            )}
      </div>
  );
}

export default CourseList;
