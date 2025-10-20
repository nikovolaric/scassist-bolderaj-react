import { ISignUp } from "../features/auth/slices/signUpSlice";

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }
      throw Error(data.message);
    }

    return data;
  } catch (error) {
    return error as Error;
  }
}

export async function logout() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

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

export async function signUpNewUser(signUpData: ISignUp) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(signUpData),
    });
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }

      throw Error(data.message);
    }
  } catch (error) {
    return error as Error;
  }
}

export async function createChild(child: {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  infoIsTrue: boolean;
  agreesToTerms: boolean;
  climbingAbility: number;
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/createchild`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(child),
      },
    );

    if (!res.ok) {
      const data = await res.json();

      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }

      throw Error(data.message);
    }
  } catch (error) {
    return error as Error;
  }
}

export async function sendChildAuthMail({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/sendchildauthmail/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      },
    );

    if (!res.ok) {
      const data = await res.json();

      if (data.status === "error") {
        throw new Error("Napaka na strežniku! Prosim poskusite kasneje.");
      }

      throw Error(data.message);
    }
  } catch (error) {
    return error as Error;
  }
}

export async function setChildAuth({
  token,
  email,
  password,
  passwordConfirm,
  phoneNumber,
}: {
  token: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phoneNumber: string;
}) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/setchildauth/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, passwordConfirm, phoneNumber }),
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

export async function updatePassword(
  currentPassword: string,
  password: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/updatepassword`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword,
          password,
        }),
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

export async function sendResetToken(email: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/forgotpassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
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

export async function resetPassword(
  token: string,
  password: string,
  passwordConfirm: string,
) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/resetpassword/${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          passwordConfirm,
        }),
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

export async function confirmMail(token: string) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/confirmmail/${token}`,
      {
        method: "GET",
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

export async function sendNewConfirmMail() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/users/sendnewconfrimmail`,
      {
        method: "POST",
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
