'use server'


type LoginTokenGeneration={

        "success": boolean;
        "email": string;
    
}

export const sendUserLogin = async () : Promise<LoginTokenGeneration> => {
    const url = new URL(
        "https://api.chec.io/v1/customers/email-token"
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    const body = {
        email: "your email",
        base_url : "https://www.google.com"
    }

    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        next: {revalidate:0},
        body: JSON.stringify(body)

    })

    if (!res.ok) {
        throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
    }

    return res.json();
}

type RegisterTokenGeneration={

    id: string;
    email: string;

}

export const sendUserRegister = async () : Promise<RegisterTokenGeneration> => {
    const url = new URL(
        "https://api.chec.io/v1/customers"
    )

    const headers = {
        "X-Authorization": `${process.env.PRIVATE_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    const body = {
        email: "your email", 
        //must be unique //will throw 422 if already created.
        // phone: "optional",
        // firstname: "optional",
        // lastname: "optional",
        // external_id: "optional", (in case you use it in external apps)
        // meta: "optional", (tags for the customer)

    }

    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        next: {revalidate:0},
        body: JSON.stringify(body)

    })

    if (!res.ok) {
        throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
    }

    return res.json();
}