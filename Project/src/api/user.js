import { jwtDecode } from "jwt-decode";
import { APIClient } from ".";

export const getMe = async () => {
  try {
    const { token } =
      JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
    if (!token) throw new Error("no token found");
    const { id } = jwtDecode(token);
    return await APIClient.get(`/users/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMe = async (id, data) => {
  const { token } = JSON.parse(localStorage.getItem("auth-store"))?.state ?? {};
  if (!token) throw new Error("no token found");

  return await APIClient.put(`/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

