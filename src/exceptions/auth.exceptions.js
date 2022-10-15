class AuthorizeNotFoundException {
  constructor() {
    this.message = "Authentication is required";
    this.code = 403;
  }
}

class PasswordIncorrectException{
  constructor(){
    this.message = "Credentials is incorrect";
    this.code = 501
  }
}
  
export { AuthorizeNotFoundException, PasswordIncorrectException };
