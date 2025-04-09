const API_URL = "http://localhost:3000/api/v1";

export async function getArticles(
  label: string,
  ageGroup?: string,
  type?: string,
) {
  try {
    const res = await fetch(
      `${API_URL}/articles/getvisible?label=${label}${ageGroup ? `&ageGroup=${ageGroup}` : ""}${type ? `&type=${type}` : ""}`,
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
      throw data;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function getOneArticle(id: string) {
  try {
    const res = await fetch(`${API_URL}/articles/${id}`, {
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

    return data;
  } catch (error) {
    return error as Error;
  }
}
