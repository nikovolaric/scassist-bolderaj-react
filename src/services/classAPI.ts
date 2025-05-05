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

export async function getMultipleDateClasses(ageGroup?: string) {
  try {
    const res = await fetch(
      `${API_URL}/classes/multipledates${ageGroup ? `?ageGroup=${ageGroup}` : "?ageGroup=adult"}`,
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

export async function getSingleDateClasses(ageGroup?: string) {
  try {
    const res = await fetch(
      `${API_URL}/classes/singledates${ageGroup ? `?ageGroup=${ageGroup}` : "?ageGroup=adult"}`,
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

export async function signUpForClassOnline({
  classCart,
  company,
  paymentData,
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
  paymentData?: {
    card: {
      holder: string;
      number: string;
      expiryMonth: string;
      expiryYear: string;
      cvv: string;
    };
    amount: string;
  };
}) {
  try {
    const res = await fetch(`${API_URL}/classes/signuponline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ articles: classCart, company, paymentData }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw data;
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
  paymentData,
  childId,
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
  paymentData?: {
    card: {
      holder: string;
      number: string;
      expiryMonth: string;
      expiryYear: string;
      cvv: string;
    };
    amount: string;
  };
  childId: string;
}) {
  try {
    const res = await fetch(
      `${API_URL}/classes/child/signuponline/${childId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ articles: classCart, company, paymentData }),
      },
    );

    if (!res.ok) {
      const data = await res.json();

      throw data;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}
