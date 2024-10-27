import axios from "axios";
import { apiUrl } from "./values";

export async function confirmAuth(): Promise<boolean> {
  const response = await axios.get(`${apiUrl}/users/me`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  console.log(response);

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}
