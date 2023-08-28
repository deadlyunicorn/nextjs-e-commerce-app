import { CoolInput } from "@/app/(Shared)/components/CoolInput";
import { CoolButton } from "@/app/(Shared)/components/Global"
import { getServerSession } from "next-auth/next";

export const CreateCategoryForm = async() => {

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
                className=" flex flex-wrap">
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
                            rounded-md
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


