import React from "react";
import { Link } from "react-router-dom";

import "./CourseCard.css";

/** Show limited information about a course
 *
 * Is rendered by CourseList to show a "card" for each course.
 *
 * CourseList -> CourseCard
 */

function CourseCard({ name, level }) {
  console.debug("CourseCard");

  return (
      <Link className="CourseCard" to={`/courses/${name}`}>
        <div>
          <h3>
            {name}
          </h3>
          <p>Level <b>{level}</b></p>
        </div>
      </Link>
  );
}

export default CourseCard;
