const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  loginEndpoint: "/auth/local",
  jwtRoleEndpoint: "users/me?populate=role",
  jwtUserEndpoint: "/users/me",
  jwtSessionStorageKey: "auth.jwt",
};

export default conf;
