// useAuth.js
import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { useCookie } from "./useCookie";
import conf from "../conf/main";
import ax, { axData } from "../conf/ax";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useCookie("user", null);
  const navigate = useNavigate();

  const updateJwt = (jwt) => {
    axData.jwt = jwt;
    if (jwt) {
      sessionStorage.setItem(conf.jwtSessionStorageKey, jwt);
    } else {
      sessionStorage.removeItem(conf.jwtSessionStorageKey);
    }
  };

  useEffect(() => {
    if (user && user.jwt) {
      updateJwt(user.jwt);
    }
  }, [user]);

  const login = useCallback(
    async (formData) => {
      try {
        const response = await ax.post(conf.loginEndpoint, {
          identifier: formData.identifier,
          password: formData.password,
        });

        const { jwt, user: userData } = response.data;
        updateJwt(jwt);
        const roleResponse = await ax.get(conf.roleEndpoint);
        const role = roleResponse.data.role.name;

        const cookieOptions = formData.rememberMe
          ? { path: "/", expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } // Persistent cookie (30 days)
          : { path: "/" }; // Session cookie

        setUser({ ...userData, role, jwt }, cookieOptions, formData.rememberMe);
        if (role == "student") {
          navigate("/student/dashboard", { replace: true });
        } else if (role == "teacher") {
          navigate("/teacher/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Login failed:", error.message || "An error occurred");
        alert("Login failed. Please check your credentials.");
      }
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    removeUser();
    navigate("/", { replace: true });
  }, [navigate, removeUser]);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
