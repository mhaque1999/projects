import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
    // Save the token and decode it
    this.token = res.token; // Save the token to use in API requests
    localStorage.setItem("token", res.token);
    const decodedToken = jwtDecode(res.token);
    
    
    return { token: res.token, user: decodedToken }; 
    // const decodedToken = jwtDecode(res.token);
    // return decodedToken; 
    //this.token = res.token;
    //return res.token;
  }

  /** Signup a user */
  static async signup(user) {
    let res = await this.request("auth/register", user, "post");
    localStorage.setItem("token", res.token);
    this.token = res.token; // Save the token to use in API requests
    const decodedToken = jwtDecode(res.token);
    
    // Return both the token and decoded user information
    return { token: res.token, user: decodedToken }; 
    // const decodedToken = jwtDecode(res.token);
    // return decodedToken;
    //return res.token;
  }

  /** Logout the user */
  static logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // User methods

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of companies with optional query. */
  static async getCompanies({ name, minEmployees, maxEmployees }) {
    const params =  { name, minEmployees, maxEmployees }
    let res = await this.request("companies", params); 
    return res.companies;
  }

  /** Get the details of a useR */
  static async getUserDetails(username) {
    console.log("this is token from getuserdetails", this.token)
    const headers = { Authorization: `Bearer ${this.token}` };
    const res = await this.request(`users/${username}`, null, "get", headers);
    //const res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Update user details */
  static async updateUser(username, data) {
    console.log(this.token);
    const headers = { Authorization: `Bearer ${this.token}` };
    let res = await this.request(`users/${username}`, data, "patch", headers);
    console.log(res)
    return {
      user: res.user,
      token: this.token 
    };
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
    const headers = { Authorization: `Bearer ${this.token}` };
    let res =  await this.request(`users/${username}/jobs/${id}`, {}, "post", headers);
    return {
      user: res.user,
      token: this.token 
    };
  }
}

// For now, set a default token (you may remove this line in production)
//JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
