const checkPassword = (value) => {
  const Reg = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (Reg.test(value)) return true;
  else return false;
};

export default checkPassword;
