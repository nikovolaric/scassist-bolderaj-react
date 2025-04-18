const API_URL = "http://localhost:3000/api/v1";

export async function getMyUnpaiedPreInvoices() {
  try {
    const res = await fetch(`${API_URL}/preinvoices/myunpaid`, {
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
