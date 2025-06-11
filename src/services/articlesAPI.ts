export async function getArticles(
  label: string | string[],
  ageGroup?: string,
  type?: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/getvisible?label=${label instanceof Array ? `${label[0]}&label=${label[1]}` : label}${ageGroup ? `&ageGroup=${ageGroup}` : ""}${type ? `&type=${type}` : ""}`,
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

export async function getOneArticle(id: string) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/articles/${id}`, {
      method: "GET",
      credentials: "include",
    });

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

export async function buyArticlesOnline({
  articles,
  paymentData,
  company,
  id,
  checkoutId,
}: {
  articles: {
    articleId: string;
    quantity: string;
  }[];
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
  company?: {
    name: string;
    address: string;
    postalCode: string;
    city: string;
    taxNumber: string;
  };
  id?: string;
  checkoutId?: string;
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/buyarticlesonline${id ? `/${id}` : ""}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ articles, paymentData, company, checkoutId }),
      },
    );

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

export async function getGiftArticles(ageGroup: string, label: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/getgifts/${ageGroup}?label=${label}`,
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

export async function buyGiftOnline({
  articles,
  company,
  checkoutId,
}: {
  articles: {
    articleId: string;
    quantity: string;
  }[];
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
      `${import.meta.env.VITE_API_URL}/articles/buygiftonline`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ articles, company, checkoutId }),
      },
    );

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
