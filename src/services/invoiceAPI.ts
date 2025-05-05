const API_URL = "http://localhost:3000/api/v1";

export async function getMyInvoices(year: string) {
  try {
    const res = await fetch(`${API_URL}/invoices/myinvoices/${year}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw new Error(data.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function downloadMyInvoice(id: string) {
  try {
    const res = await fetch(`${API_URL}/invoices/myinvoices/download/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      if (data.error.statusCode === 500) {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw new Error(data.message);
    }

    const data = await res.blob();

    return data;
  } catch (error) {
    return error as Error;
  }
}
