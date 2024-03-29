const USER_REGEX = /^[A-z]{3,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const ID_REGEXP = /^[0-9]*$/;
const RATING_REGEX = /^[0-5]{1}$/;

export { USER_REGEX, PWD_REGEX, EMAIL_REGEX, ID_REGEXP, RATING_REGEX };
