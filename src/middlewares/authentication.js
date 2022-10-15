import { jwtVerify } from "../helpers/jwt";
import { AuthorizeNotFoundException } from "../exceptions/auth.exceptions";

// Validar que exista un access token y que este sea correcto
const authenticate = (request, response, next) => {
  try {
    // Headers -> Authorization: Bearer access_token
    const { authorization } = request.headers;
    if (!authorization) throw new AuthorizeNotFoundException();
    const accessToken = authorization.split(" ")[1];

    const payload = jwtVerify(accessToken);
    request.current_user = payload.id;
    return next();
  } catch (error) {
    return response.status(error?.code || 500).json({
      message: error?.message || "Error in authenticate",
    });
  }
};

export default authenticate;
