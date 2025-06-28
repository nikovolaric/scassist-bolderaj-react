export async function getMe() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/getme`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      return data;
    }

    return data.me;
  } catch (error) {
    return error as Error;
  }
}

export async function getMyKids() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/getmychildren`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const data = await res.json();

    return data.children;
  } catch (error) {
    return error as Error;
  }
}

export async function getMyChild(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/getmychildren/${id}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function updateMe(
  firstName?: string,
  lastName?: string,
  address?: string,
  city?: string,
  postalCode?: string,
  country?: string,
  phoneNumber?: string,
  email?: string,
  climbingAbility?: number,
) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/updateme`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        address,
        city,
        postalCode,
        country,
        phoneNumber,
        email,
        climbingAbility,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}
