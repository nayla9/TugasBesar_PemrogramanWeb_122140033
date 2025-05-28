import { useState } from "react";

export function useLoginRegister() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * registerUser menerima objek registerData dengan properti:
   * { username, email, password, role }
   */
  const registerUser = async (registerData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/register`, {  // path relatif, pakai proxy
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      // Simpan user ke state (minimal id, username, dan role)
      setUser({ id: data.user_id, username: data.username, role: data.role });

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * loginUser menerima objek loginData dengan properti:
   * { email, password }
   * Pastikan backend mengirim user lengkap termasuk role.
   */
  const loginUser = async (loginData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login gagal");
      }

      // Simpan user lengkap ke state, termasuk role
      setUser(data.user);

      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    registerUser,
    loginUser,
    logout,
  };
}
