class UserNotFoundException{
    constructor(){
        this.message = "User not found";
        this.code=404;
    }
}

class UserDisabledException{
    constructor(){
        this.message="User disabled";
        this.code=501;
    }
}
export {UserNotFoundException, UserDisabledException};