export async function getMyUnpaiedPreInvoices() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/preinvoices/myunpaid`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
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

export async function downloadPreinvoiceFromClass(classId: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/preinvoices/download/class/${classId}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const data = await res.blob();

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function downloadMyPreinvoice(id: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/preinvoices/download/${id}`,
      {
        method: "GET",
        credentials: "include",
      },
    );

    if (!res.ok) {
      const data = await res.json();
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    const data = await res.blob();

    return data;
  } catch (error) {
    return error as Error;
  }
}
