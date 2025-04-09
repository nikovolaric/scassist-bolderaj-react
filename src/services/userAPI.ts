const API_URL = "http://localhost:3000/api/v1";

export async function getMe() {
  try {
    const res = await fetch(`${API_URL}/users/getme`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw data;
    }

    const data = await res.json();

    return data.me;
  } catch (error) {
    return error as Error;
  }
}

export async function getMyKids() {
  try {
    const res = await fetch(`${API_URL}/users/getmychildren`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw new Error(data.message);
    }

    const data = await res.json();

    return data.children;
  } catch (error) {
    return error as Error;
  }
}

export async function getMyChild(id: string) {
  try {
    const res = await fetch(`${API_URL}/users/getmychildren/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw new Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}
