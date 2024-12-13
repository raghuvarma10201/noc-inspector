import axios, { AxiosProgressEvent } from 'axios';
import axiosInstance from '../interceptors/ApiInterceptor';

import { formatDateTime } from '../utils/dateTimeUtils';
import { useIonLoading } from '@ionic/react';
import { useState } from 'react';

const apiUrl: any = import.meta.env.VITE_API_URL;


export const uploadFile = async (formData: FormData) => {
  const config = {
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      const percentCompleted = progressEvent.total ? Math.max(Math.round((progressEvent.loaded * 100) / progressEvent.total) - 5, 0) : 0;
      console.log(percentCompleted);
    },
  };
  try {
    const response = await axiosInstance.post(`${apiUrl}api/v1/uplod-file`, formData);
    console.log(response);
    return response;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getCourseList = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/courses-list`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getIndividualCourseList = async () => {
  const payload = {
    "columns": [
      "tbl_courses.id as course_id",
      "tbl_courses.course_name",
      "tbl_courses.description"
    ],
    "order_by": {
      "tbl_courses.course_name": "DESC"
    },
    "filters": {
    },
    "pagination": {
      "limit": "10",
      "page": "1"
    }
  }
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/trainee-users-courses-list`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getCorporateCourseList = async () => {
  let payload = {
    "columns": [
      "tbl_courses.id as course_id",
      "tbl_courses.course_name",
      "tbl_courses.description"
    ],
    "order_by": {
      "tbl_courses.course_name": "DESC"
    },
    "filters": {
    },
    "pagination": {
      "limit": "10",
      "page": "1"
    }
  }
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/corporate-user-courses-list`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getIndividualCourseData = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/trainee-users-course-materials`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getCorporateCourseData = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/corporate-user-course-employees`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const markAttendance = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/mark-trainee-attendance`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getUserList = async () => {
  let payload = {
    "columns": [
      "tbl_training_users.id",
      "tbl_training_users.first_name",
      "tbl_training_users.last_name",
      "tbl_training_users.email_id",
      "tbl_training_users.mobile_no",
      "tbl_status.status_name",
      "tbl_roles.role_name",
      "tbl_status.id as status_id",

    ],
    "order_by": {
      "tbl_training_users.created_on": "desc"
    },
    "filters": {

    },
    "pagination": {
      "limit": "10",
      "page": "1"
    }
  }
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/users-list`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const registerUser = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/create-user`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getUserTypes = async (payload: any) => {
  try {
    const response = await axios.post(`${apiUrl}v1/get-registered-user-types`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const enrollCourseTraining = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/enroll-course-training`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getBase64Path = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/download-file`, payload);
    return response;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getTransactions = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/get-transaction-list`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getTransactionDetails = async (enrollmentId: any) => {
  const storedUserData: any = localStorage.getItem('userData');
  const parsedUserData: any = JSON.parse(storedUserData);
  let payload;
  let url;
  if (parsedUserData.user_type == 17) {
    payload = {
      "columns": [
        "tbl_enrolls.id",
        "tbl_enrolls.enrollment_id",
        "tbl_enrolls.no_of_courses",
        "tbl_enrolls.no_of_users",
        "tbl_enrolls.total_amount",
        "tbl_enrolls.payment_status",
        "tbl_enrolls.payment_id",
        "tbl_courses.course_name",
        "tbl_training_users.first_name",
        "tbl_training_users.last_name",
        "tbl_training_users.email_id",
        "tbl_training_users.mobile_no"
      ],
      "order_by": {
        "tbl_training_users.first_name": "ASC"
      },
      "filters": {
        "tbl_enrolls.id": enrollmentId
      },
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }
    url = `${apiUrl}v1/get-corporate-transaction-details`;
  } else {
    payload = {
      "columns": [
        "tbl_enrolls.id",
        "tbl_enrolls.enrollment_id",
        "tbl_enrolls.no_of_courses",
        "tbl_enrolls.no_of_users",
        "tbl_enrolls.total_amount",
        "tbl_enrolls.payment_status",
        "tbl_enrolls.payment_id",
        "tbl_courses.course_name",
        "tbl_courses.description",
        "tbl_training_users.first_name",
        "tbl_training_users.last_name",
        "tbl_training_users.email_id"
      ],
      "order_by": {
        "tbl_training_users.first_name": "ASC"
      },
      "filters": {
        "tbl_enrolls.id": enrollmentId
      },
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }
    url = `${apiUrl}v1/get-transaction-details`;
  }
  try {
    const response = await axiosInstance.post(url, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getQuizList = async () => {
  const payload = {
    "columns": [
      "tbl_quiz.id",
      "tbl_quiz.quiz_name",
      "tbl_quiz.total_marks",
      "tbl_quiz.no_of_questions"
    ],
    "order_by": {
      "tbl_quiz.created_by": "DESC"
    },
    "filters": {},
    "pagination": {
      "limit": "10",
      "page": "1"
    }
  }
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/get-quiz`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getExamData = async (quiz_id: any) => {
  const payload = {
    "columns": [
      "tbl_quiz.id as quiz_id",
      "tbl_quiz.quiz_name",
      "tbl_quiz.total_marks",
      "tbl_quiz.no_of_questions",
      "tbl_training_questionnaires.id as question_id",
      "tbl_training_questionnaires.question",
      "tbl_training_questionnaires.marks",
      "tbl_training_answers.id as answer_id",
      "tbl_training_answers.answer",
      "tbl_training_answers.is_correct"
    ],
    "order_by": {
      "tbl_quiz.created_by": "DESC"
    },
    "filters": {
      "tbl_quiz.id": quiz_id
    },
    "pagination": {
      "limit": "100",
      "page": "1"
    }
  }

  try {
    const response = await axiosInstance.post(`${apiUrl}v1/get-quiz-questions`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const validateExam = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/validate-quiz`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getResults = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/test-result`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getSlotAvailability = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/slot-availability
`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const bookSlot = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/book-slot`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const getUserAttendance = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/get-trainee-attendance`, payload);
    return response.data;
  }
  catch (error: any) {
    return error.response.data;
  }
};
export const appSettings = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}v1/get-settings`, payload);
    return response;
  }
  catch (error: any) {
    return error.response.data;
  }
};