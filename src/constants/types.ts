type programOptions = {
  fetch?: () => string;
  save?: () => string;
  list?: () => string;
  geo?: () => string;
  lang?: () => string;
  repo?: () => string;  
}


export { programOptions };