import FormValidator from '../components/FormValidator/FormValidator';
import { validationConfig, validationConfigForProfile } from './constants';

// включить валидацию формы
const validateForm = (form, config) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
  return formValidator;
};

const validateAuthForm = (form) => validateForm(form, validationConfig);

const validateProfileForm = (form) => validateForm(form, validationConfigForProfile);

export { validateAuthForm, validateProfileForm };
