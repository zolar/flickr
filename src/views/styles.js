export const APP_CONTAINER = {
  display       : 'flex',
  flexDirection : 'column',
  minHeight     : '100vh',
  position      : 'relative',
};

export const APP_CONTENT = {
  alignContent   : 'center',
  alignItems     : 'center',
  background     : '#f1f1f1',
  display        : 'flex',
  flex           : 1,
  justifyContent : 'center',
};

export const APP_FOOTER = {
  display       : 'flex',
  flex          : 0,
  flexDirection : 'row',
  minHeight     : 50,
};

export const APP_HEADER = {
  alignContent   : 'center',
  alignItems     : 'center',
  display        : 'flex',
  flexDirection  : 'row',
  flex           : 0,
  justifyContent : 'center',
  minHeight      : 50,
};

export default {
  container : APP_CONTAINER,
  content   : APP_CONTENT,
  footer    : APP_FOOTER,
  header    : APP_HEADER,
};
