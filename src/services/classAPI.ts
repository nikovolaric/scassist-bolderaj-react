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
      if (data.status === "error") {
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
      if (data.status === "error") {
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
    const params = new URLSearchParams();

    params.append("hiddenUsers", "false");
    params.append("article", article);

    if (ageGroup) {
      params.append("ageGroup", ageGroup);
    } else {
      params.append("ageGroup", "adult");
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/multipledates?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
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
    const params = new URLSearchParams();

    params.append("hiddenUsers", "false");
    params.append("article", article);

    if (ageGroup) {
      params.append("ageGroup", ageGroup);
    } else {
      params.append("ageGroup", "adult");
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/classes/singledates?${params.toString()}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
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
    const data = await res.json();

    if (!res.ok) {
      if (data.status === "error") {
        throw new Error(
          "Nekaj je šlo narobe na strežniku! Poiskusite kasneje!",
        );
      }
      throw Error(data.message);
    }

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
