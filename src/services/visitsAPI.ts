const API_URL = "http://localhost:3000/api/v1";

export async function getMyLastVisits(limit: number) {
  try {
    const res = await fetch(
      `${API_URL}/visits/myvisits?limit=${limit}&sort=-date`,
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

export async function getChildLastVisits(id: string, limit: number) {
  try {
    const res = await fetch(
      `${API_URL}/visits/childvisits/${id}?limit=${limit}&sort=-date`,
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

export async function getYearlyVisitNo(year: number) {
  try {
    const res = await fetch(`${API_URL}/visits/yearly/${year}`, {
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
