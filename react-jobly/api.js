// import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

// /** API Class.
//  *
//  * Static class tying together methods used to get/send to to the API.
//  * There shouldn't be any frontend-specific stuff here, and there shouldn't
//  * be any API-aware stuff elsewhere in the frontend.
//  *
//  */

// class JoblyApi {
//   // the token for interactive with the API will be stored here.
//   static token;

//   static async request(endpoint, data = {}, method = "get") {
//     console.debug("API Call:", endpoint, data, method);

//     //there are multiple ways to pass an authorization token, this is how you pass it in the header.
//     //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
//     const url = `${BASE_URL}/${endpoint}`;
//     const headers = { Authorization: `Bearer ${JoblyApi.token}` };
//     const params = (method === "get")
//         ? data
//         : {};

//     try {
//       return (await axios({ url, method, data, params, headers })).data;
//     } catch (err) {
//       console.error("API Error:", err.response);
//       let message = err.response.data.error.message;
//       throw Array.isArray(message) ? message : [message];
//     }
//   }

//   // Individual API routes

//   /** Get details on a company by handle. */

//   static async getCompany(handle) {
//     let res = await this.request(`companies/${handle}`);
//     return res.company;
//   }

//   // obviously, you'll add a lot here ...

//   static async getCompanies(query) {
//     let res = await this.request(`companies`, { search: query });
//     return res.companies;
//   }

//   static async getCurrentUser() {
//     let res = await this.request("users/current");
//     return res.user;
//   }

// }

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // Construct the URL and headers
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Authentication methods

  /** Login a user */
  static async login({ username, password }) {
    let res = await this.request("auth/token", { username, password }, "post");
    this.token = res.token;
    return res.token;
  }

  /** Signup a user */
  static async signup(user) {
    let res = await this.request("auth/register", user, "post");
    this.token = res.token;
    return res.token;
  }

  /** Logout the user */
  static logout() {
    this.token = null;
  }

  // User methods

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of companies with optional query. */
  static async getCompanies(query) {
    let res = await this.request("companies", { search: query });
    return res.companies;
  }

  /** Get details of the current user */
  static async getCurrentUser() {
    try {
      let res = await this.request("users/current");
      return res.user;
    } catch (err) {
      // Handle unauthorized access
      return null;
    }
  }

  /** Update user details */
  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "put");
    return res.user;
  }

  /** Delete a user */
  static async deleteUser(username) {
    await this.request(`users/${username}`, {}, "delete");
  }

  // Job methods

  /** Get a list of jobs with optional query. */
  static async getJobs(query) {
    let res = await this.request("jobs", { search: query });
    return res.jobs;
  }

  /** Get details on a job by id. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Apply to a job */
  static async applyToJob(username, id) {
    await this.request(`jobs/${id}/apply`, { username }, "post");
  }
}

// For now, set a default token (you may remove this line in production)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
