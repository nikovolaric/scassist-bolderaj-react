export async function getMyClasses(limit?: number) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/myclasses${limit ? `?limit=${limit}` : ""}`,
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

export async function getChildClasses(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/child/getclasses/${id}`,
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

export async function getMultipleDateClasses(
  article: string,
  ageGroup?: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/multipledates?article=${article}${ageGroup ? `&ageGroup=${ageGroup}` : "&ageGroup=adult"}`,
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

export async function getSingleDateClasses(article: string, ageGroup?: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/singledates?article=${article}${ageGroup ? `&ageGroup=${ageGroup}` : "&ageGroup=adult"}`,
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

export async function signUpForClassOnline({
  classCart,
  company,
  checkoutId,
}: {
  classCart: {
    classes: string[];
    articleId: string;
    paymentMethod?: string;
  };
  company?: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    taxNumber: string;
  };
  checkoutId?: string;
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/signuponline`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          articles: classCart,
          company,
          checkoutId,
        }),
      },
    );

    if (!res.ok) {
      const data = await res.json();
      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function signUpChildForClassOnline({
  classCart,
  company,
  childId,
  checkoutId,
}: {
  classCart: {
    classes: string[];
    articleId: string;
    paymentMethod?: string;
  };
  company?: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    taxNumber: string;
  };
  childId: string;
  checkoutId?: string;
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/child/signuponline/${childId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ articles: classCart, company, checkoutId }),
      },
    );

    if (!res.ok) {
      const data = await res.json();

      throw Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}
