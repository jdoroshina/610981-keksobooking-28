const ALERT_TIMEOUT = 2000;

const showAlertMessage = (message) => {
  const alertElement = document.createElement('div');
  alertElement.setAttribute('role', 'alert');
  alertElement.classList.add('alert');
  alertElement.textContent = message;
  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_TIMEOUT);
};

export { showAlertMessage };
