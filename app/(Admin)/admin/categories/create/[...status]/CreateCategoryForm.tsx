import { CoolButton } from "@/app/(Shared)/components/Global"
import { fetchCategories } from "@/app/(User)/(lib)/api/categories";
import { getCookies } from "@/app/(User)/(lib)/api/cookies";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { ReactNode } from "react";

export const CreateCategoryForm = async() => {

    const categories = await fetchCategories();
    const session =  await getServerSession();



    return (
        <form

            id="categoryForm"
            action={session?'/admin/categories/create/loading':"/admin/unauthorized"}
            className="
                    px-2
                    flex flex-col
                    text-lg 
                    gap-y-2">


            <div
                className="flex flex-wrap">
                Category Name:&ensp;
                <CoolInput>
                    <input
                        required
                        minLength={4}
                        maxLength={20}
                        name="name"/>
                </CoolInput>
            </div>
            <div
                className="flex flex-wrap">
                Slug:&ensp;
                <CoolInput>
                    <input
                        required
                        pattern="([^ \W \s ]|-)+"
                        title="Slug shouldn't contain any whitespaces. You can use '_' or '-' e.g. 'cool_item'"
                        minLength={4}
                        name="slug"/>
                </CoolInput>
            </div>
            
            <div
                className="flex flex-wrap">
                Description:&ensp;
                <CoolInput>
                    <input
                        minLength={10}
                        name="description"/>
                </CoolInput>

            </div>
            

            <div
                className="flex flex-wrap justify-center">

                <CoolButton>
                    <input
                        defaultValue={"Submit"}
                        type="submit"
                        className="
                            cursor-pointer
                            w-44 h-10 
                            bg-slate-200 hover:bg-slate-100 rounded-md
                            dark:bg-transparent
                            capitalize"/>
                    {/* {loading?"Loading":"Make Changes"} */}
                </CoolButton>
            </div>


        </form>
    )

}

//todo A good idea would be to show the available store items
//todo and be able to tick which ones would belong to this category.


export const CoolInput = ({ children }: { children: ReactNode }) => (
    <div
        className="
    max-w-[100%]
    text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-200 
    dark:hover:bg-slate-950 dark:bg-slate-900">
        {children}
    </div>
)



