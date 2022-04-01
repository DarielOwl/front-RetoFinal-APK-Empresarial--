export const checkEmail = (value) => {
  if (!value.trim()) {
    return {
      value: value,
      valid: false,
    };
  }
  return {
    value: value,
    valid: true,
  };
};

export const checkPassword = (value) => {
  if (value.trim().length < 8) {
    return {
      value: value,
      valid: false,
    };
  }
  return {
    value: value,
    valid: true,
  };
};

export const checkConfirmPassword = (password, confirmPassword) => {
  if (password && confirmPassword && password !== confirmPassword) {
    return {
      value: confirmPassword,
      valid: false,
    };
  }
  return {
    value: confirmPassword,
    valid: true,
  };
};

export const checkPhonenumber = (value) => {
  if (!parseInt(value) && value.length !== 11) {
    return {
      value: value,
      valid: false,
    };
  }
  return {
    value: value,
    valid: true,
  };
};

export const checkAddress = (value) => {
  if (!parseInt(value) && value.trim().length < 10) {
    return {
      value: value,
      valid: false,
    };
  }
  return {
    value: value,
    valid: true,
  };
};
