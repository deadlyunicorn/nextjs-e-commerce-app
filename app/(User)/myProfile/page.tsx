import { SignOutButton } from "@/app/(Shared)/components/Global";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

const EmailPageRedirect = async()=>{

    const session = await getServerSession();
    if (!session){
        redirect('/signin');
    }

    return (
        <main>
            Hello world {session.user?.email};
            <SignOutButton/>
        </main>
    )
}

export default EmailPageRedirect;