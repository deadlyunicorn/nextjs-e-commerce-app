import { redirect } from "next/navigation";
import ContactForm from "../page";
import { FailureMessage, SuccessMessage } from "@/app/(Shared)/components/UserAlert";

const ContactFormStatus = ({params}:{params:{status:string}}) => {


    let fail;

    if ( params.status == "success" ){
        fail = false;
    }
    else if ( params.status == "fail" ){
        fail = true;
    }
    else{
        redirect("/contact");
    }
    

    return (
        <main>
            {params.status=="success" && 
            <SuccessMessage message={"Successfully sent mail!"}/>}

            {params.status=="fail" && 
            <FailureMessage error={"Your mail could not be sent. Please try again."}/>}
            <ContactForm fail={fail}/>
        </main>
    )
}

export default ContactFormStatus;

