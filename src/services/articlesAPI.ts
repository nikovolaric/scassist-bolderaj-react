export async function getArticles(
  label: string,
  ageGroup?: string,
  type?: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/articles/getvisible?label=${label}${ageGroup ? `&ageGroup=${ageGroup}` : ""}${type ? `&type=${type}` : ""}`,
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
}: {
  articles: {
    articleId: string;
    quantity: string;
    gift: boolean;
  }[];
  paymentData: {
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
        body: JSON.stringify({ articles, paymentData, company }),
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
