import { isString } from "lodash-es";

const INVALID_SESSION_ID = "00000000-0000-0000-0000-000000000000";

export const parseQuestion = (q) => {
  if (!q) return null;
  try {
    return isString(q) ? JSON.parse(q) : q;
  } catch {
    return q;
  }
};

export const isValidSessionId = (id) =>
  id && isString(id) && id !== INVALID_SESSION_ID;

export const getTimerStorageKey = (sessionId, index) =>
  `timer_${sessionId}_${index}`;

export const clearSessionTimers = (sessionId) => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(`timer_${sessionId}`)) localStorage.removeItem(key);
  });
};

export const buildAnswerFormData = ({ sessionId, questionId, questionIndex, timeTaken, answerData }) => {
  const formData = new FormData();
  formData.append("SessionId", sessionId);
  formData.append("QuestionId", questionId);
  formData.append("currentQuestionIndex", questionIndex);
  formData.append("time", String(timeTaken));
  if (answerData?.voiceFile) formData.append("voiceFile", answerData.voiceFile, "voice.wav");
  else formData.append("UserAnswer", answerData?.text || "");
  return formData;
};