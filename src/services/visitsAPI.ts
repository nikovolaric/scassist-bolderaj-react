export async function getMyLastVisits(limit: number) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/visits/myvisits?limit=${limit}&sort=-date`,
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
      throw Error(data.message);
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
      `${import.meta.env.VITE_API_URL}/visits/childvisits/${id}?limit=${limit}&sort=-date`,
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
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function getYearlyVisitNo(year: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/visits/yearly/${year}`,
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
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}
