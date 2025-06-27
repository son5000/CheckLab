export function checkUserFromEnv(id, pw) {
  const idList = Object.entries(process.env)
    .filter(([key]) => key.startsWith("REACT_APP_ID"))
    .map(([, value]) => value);
  const pwList = Object.entries(process.env)
    .filter(([key]) => key.startsWith("REACT_APP_PW"))
    .map(([, value]) => value);

  const idValid = idList.includes(id);
  const pwValid = pwList.includes(pw);

  return idValid && pwValid;
}
