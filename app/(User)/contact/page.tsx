import { redirect } from "next/navigation";
import { MockSubmitButton, SubmitContactButton } from "./submitButton";

const ContactForm = ({fail}:{fail:boolean}) => {


    if (fail == undefined){
        fail = false;
    }

    return (
        <main>
        <form 
            action={handleForm}
            className="group flex flex-col gap-y-2 items-center">
          
            <FormInputElement name="alias" width={200}/>
            <FormInputElement name="subject" width={400}/>


            
            

            <div className="flex flex-col  items-center border-b-black border-b mb-2 ">

                <label className="text-lg mb-2 w-fit capitalize" htmlFor="message">message</label>
                <textarea 
                    minLength={20}
                    className="
                        resize-none
                        h-[200px] placeholder:text-center
                        w-[400px] px-2 py-1 rounded-md 
                        dark:focus:bg-slate-950 
                        dark:bg-slate-900
                        bg-slate-200
                        focus:bg-slate-100
                            placeholder:capitalize"
                    required placeholder="Your message" name="message" id="message"/>

            </div>

            <div className="flex flex-col  items-center border-b-black border-b mb-2">

                <label className="text-lg mb-2 w-fit capitalize" htmlFor="email">email</label>
                <input 
                    type="email"
                    className="w-[400px] h-10 px-2 py-1 rounded-md 

                        dark:focus:bg-slate-950 
                        dark:bg-slate-900
                        bg-slate-200
                        focus:bg-slate-100
                        placeholder:capitalize"
                    placeholder='Where can we contact you at ?' name="email" id="email"/>
            </div>

            <div className="group-valid:inline hidden">
                <SubmitContactButton fail={fail}/>
            </div>
            <div className="group-valid:hidden inline"> 
                <MockSubmitButton fail={fail}/>

            </div>
            
        </form>
        </main>
    )
}

const FormInputElement = ({name,width}:{name:string,width:number}) => (
    <div className="flex flex-col  items-center border-b-black border-b mb-2">

            <label className="text-lg mb-2 w-fit capitalize" htmlFor={name}>{name}</label>
            <input 
                minLength={4}
                style={{width:`${width}px`}}
                className="
                    bg-slate-200
                    focus:bg-slate-100
                    dark:focus:bg-slate-950 
                    dark:bg-slate-900 
                    h-10 px-2 py-1 rounded-md bg-inherit  placeholder:capitalize"
                required placeholder={name} name={name} id={name}/>
    </div>
)

export default ContactForm;

const handleForm = async(data:FormData)=>{
    "use server"

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const dataValid = {
        alias:"",
        subject:"",
        message:"",
        email:""
    }

    for (const entry of data.entries()){
        const [key,value] = entry;
        // @ts-ignore
        dataValid[key]=value;
    };

    const msg = {
        to: process.env.ALLOWED_EMAIL, // Change to your recipient
        from: process.env.SENDGRID_SENDER,
        subject: dataValid.subject,
        text: "You've got a new message!",
        html: `<p>${dataValid.message}. ${dataValid.email&&`<br/><center>You can contact me at ${dataValid.email}`}.<br/>Best Regards, ${dataValid.alias}.</center></p>`,
    }

    const res=await sgMail
        .send(msg)
        .catch(() => {
            return "error";
        })
        .then(()=>"okay")

    if (res=="okay"){
        redirect('/contact/success');
    }
    else{
        redirect('/contact/fail');
    }
        
    


}