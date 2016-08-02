export const persistLocation = (location) => {
  const date = new Date(),
      thirtyDays = 2592000000;
  date.setTime(date.getTime() + thirtyDays); 
  document.cookie = `previousCity=${ location }; expires=${ date.toUTCString() }; path=/`;
};

export const recoverLocation = () => {
  let crumb,
      crumbs = document.cookie.split(';'),
      i = 0;
  for(; i < crumbs.length; i += 1) {
      crumb = crumbs[i].trim();
      if (crumb.indexOf('previousCity') === 0) {
          return crumb.substring('previousCity'.length + 1, crumb.length);
      }
  }
  return false;
};
