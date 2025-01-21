const conf = {
  apiUrlPrefix: "http://localhost:1337/api",
  loginEndpoint: "/auth/local",
  roleEndpoint: "users/me?populate=role",
  jwtUserEndpoint: "/users/me",
  jwtSessionStorageKey: "auth.jwt",
};

export default conf;
