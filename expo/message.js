import { showMessage } from "react-native-flash-message";

function success(msg) {
  showMessage({
    message: msg,
    type: "success",
    duration: 5000,
    icon: "success",
  });
}

function warning(msg) {
  showMessage({
    message: msg,
    type: "warning",
    duration: 5000,
    icon: "warning",
  });
}

function error(msg) {
  showMessage({
    message: msg,
    type: "danger",
    duration: 5000,
    icon: "danger",
  });
}

export default {
  success,
  warning,
  error,
};
