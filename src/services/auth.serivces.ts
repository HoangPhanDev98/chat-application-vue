import http from "@/http-common";

class AuthService {
  signup(email: string, username: string, password: string): Promise<any> {
    return http.post("/auth/signup", { email, username, password });
  }

  login(username: string, password: string): Promise<any> {
    return http.post("/auth/login", { username, password });
  }
}

export default new AuthService();
