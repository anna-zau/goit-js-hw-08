import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormData, 500));

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  console.log(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onFormData() {
  const formData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
}

localStorageSaveData();

function localStorageSaveData() {
  let savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
}
