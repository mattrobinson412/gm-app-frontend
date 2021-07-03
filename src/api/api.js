import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class graceMusicApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);
    
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }
      }
  
    // Individual API routes

    // GET current user.

    static async getCurrentUser(username) {
      let res = await this.request(`users/${username}`);
      return res.user;
    }

    /** Get token for login from username, password. */

    static async login(data) {
      let res = await this.request(`auth/token`, data, "post");
      return res.token;
    }

    /** Signup for site. */

    static async signup(data) {
      let res = await this.request(`auth/register`, data, "post");
      return res.token;
    }

    /** Save user profile page. */

    static async saveProfile(username, data) {
      let res = await this.request(`users/${username}`, data, "patch");
      return res.user;
    }

    /** GET a specific course. */
    
    static async getCourse(name) {
      let res = await this.request(`courses/${name}`);
      return res.course;
    }

    // GET all lessons for a specific course.

    static async getLessons(courseId) {
      let res = await this.request("lessons", { courseId });
      return res.lessons;
    }

    // GET specific lesson for a specific course.

    static async getLesson(courseId, lessonNumber) {
      let res = await this.request(`courses/${courseId}`, lessonNumber);
      return res.lesson;
    }

    // POST a course_lesson for a specific user.

    static async createCourseLesson(data) {
      let res = await this.request(`courselesson`, data, "post");
      return res.courselesson;
    }

}

export default graceMusicApi;