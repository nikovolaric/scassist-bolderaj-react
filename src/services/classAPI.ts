const API_URL = "http://localhost:3000/api/v1";

export async function getMyClasses(limit?: number) {
  try {
    const res = await fetch(
      `${API_URL}/classes/myclasses${limit ? `?limit=${limit}` : ""}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error(
          "Nekaj je šlo narobe na strežniku! Poiskusite kasneje!",
        );
      }
      throw data;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function getChildClasses(id: string) {
  try {
    const res = await fetch(`${API_URL}/classes/child/getclasses/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error(
          "Nekaj je šlo narobe na strežniku! Poiskusite kasneje!",
        );
      }
      throw data;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function getMultipleDateClasses() {
  try {
    const res = await fetch(`${API_URL}/classes/multipledates`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error(
          "Nekaj je šlo narobe na strežniku! Poiskusite kasneje!",
        );
      }
      throw data;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function getSingleDateClasses() {
  try {
    const res = await fetch(`${API_URL}/classes/singledates`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error(
          "Nekaj je šlo narobe na strežniku! Poiskusite kasneje!",
        );
      }
      throw data;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function signUpForClassOnline(classCart: {
  classes: string[];
  articleId: string;
  paymentMethod: string;
}) {
  try {
    const res = await fetch(`${API_URL}/classes/signuponline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(classCart),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      if (data.error.statusCode === 500) {
        throw new Error(
          "Nekaj je šlo narobe na strežniku! Poiskusite kasneje!",
        );
      }
      throw data;
    }

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    return error as Error;
  }
}
