import { CoolLink } from "@/app/(Shared)/components/Global";
import Link from "next/link"

const NextPage = ({currentPage,nextPageExists}:{currentPage:number,nextPageExists:boolean}) => {
    return(
        <nav className="
            mt-10 w-full
            grid grid-cols-3 
            text-lg">
            {
                (currentPage>1)
                ?<CoolLink href={`./${currentPage-1}`}>Previous page</CoolLink>
                :<div></div>
            }

            <p>Page number {currentPage}</p>

            {
                nextPageExists
                ?<CoolLink href={`./${currentPage+1}`}>Next page</CoolLink>
                :<div></div>
            }
            
        </nav>
    )
}

export default NextPage;

export const PageNotFoundComponent = () => (
    <main>
        There was an error in your request.
        <br/>
        <CoolLink href="/explore">
            Go back.
        </CoolLink>

    </main>
)