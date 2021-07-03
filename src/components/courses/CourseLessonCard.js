import React from "react";
import "./CourseLessonCard.css";

/** Show limited information about a CourseLesson.
 *
 * Is rendered by CourseLessonCardList to show a "card" for each lesson.
 *
 * Receives props from parent.
 * 
 */

function CourseLessonCard({ lesson }) {
  console.debug("CourseLessonCard");

  return (
      <div className="CourseLessonCard">
          <h3>{lesson.name}</h3> - <h5>#{lesson.number}</h5>
      </div>
  );
}

export default CourseLessonCard;
