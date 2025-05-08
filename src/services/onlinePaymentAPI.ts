export async function makePayment(bodyData: {
  amount: string;
  card: {
    number: string;
    holder: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  };
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/payments/makepayment`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
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
