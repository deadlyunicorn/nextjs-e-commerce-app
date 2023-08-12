import { redirect } from "next/navigation"

const RedirectToOrder = () => {

    redirect("/admin/orders/1/created_at/desc")


    return (<></>)
}

export default RedirectToOrder