export const fetchCategories = async()=>{
    const url = new URL(
        "https://api.chec.io/v1/categories/"
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    const res=await fetch(url, {
        method: "GET",
        headers: headers,
    })
    
    if (!res.ok){
        throw new Error(`Fetch failed`);
    }
    return res.json().then(result=>result.data);
}