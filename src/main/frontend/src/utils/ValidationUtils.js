// @flow
export default class ValidationUtils {

  static required = (value: ?string): boolean => {
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  static notBlank = (value: ?string): boolean => {
    if (value && value.trim()) {
      return true;
    } else {
      return false;
    }
  }

  static emailOrEmpty = (value: ?string): boolean => {
    if (value) {
      if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
