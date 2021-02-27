/* eslint-disable */
import axios from 'axios';
const API_URL = 'https://calorie-counter-rest.herokuapp.com'; /* https://calorie-counter-rest.herokuapp.com or http://localhost:8000 */

export class APIService {
  getSetting() {
    const url = `${API_URL}/api/settings`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }
  updateSettings(settings) {
    const url = `${API_URL}/api/settings/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, settings, {headers: headers});
  }

  getIntake(param_pk) {
    const url = `${API_URL}/api/intake/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::"+jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }
  getIntakeList() {
    const url = `${API_URL}/api/intake`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});
  }
  addNewIntake(intake) {
    const url = `${API_URL}/api/intake/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, intake, {headers: headers});
  }
  updateIntake(intake) {
    const url = `${API_URL}/api/intake/${intake.id}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, intake, {headers: headers});
  }
  deleteIntake(intake_Pk) {
    const url = `${API_URL}/api/intake/${intake_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }

  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }
  register(credentials) {
    const url = `${API_URL}/auth/users/`;
    return axios.post(url, credentials);
  }
}
