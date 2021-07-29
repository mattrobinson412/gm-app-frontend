import React from "react";
// import "./CourseLessonCard.css";

/** Show limited information about a CourseLesson.
 *
 * Is rendered by CourseLessonCardList to show a "card" for each lesson.
 *
 * Receives props from parent.
 * 
 */

function CourseLessonCard({ lessonName, lessonNumber }) {
  console.debug("CourseLessonCard", lessonName, lessonNumber);

  return (
      <div className="CourseLessonCard">
          <h3>{lessonName}</h3> - <h5>#{lessonNumber}</h5>
      </div>
  );
}

export default CourseLessonCard;
