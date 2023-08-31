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

export const NextPageWithQuery = (
        {currentPage,nextPageExists,searchQuery}
        :{currentPage:number,nextPageExists:boolean,searchQuery:string}
    ) => {
    return(
        <nav className="
            mt-10 w-full
            grid grid-cols-3 
            text-lg">
            {
                (currentPage>1)
                ?<CoolLink href={`./${currentPage-1}${searchQuery}`}>Previous page</CoolLink>
                :<div></div>
            }

            <p>Page number {currentPage}</p>

            {
                nextPageExists
                ?<CoolLink href={`./${currentPage+1}${searchQuery}`}>Next page</CoolLink>
                :<div></div>
            }
            
        </nav>
    )
}

export const PageNotFoundComponent = ({goBackURL}:{goBackURL:string}) => (
    <main>
        There was an error in your request. The page you are searching for might not exist.
        <br/>
        <CoolLink href={goBackURL}>
            Go back.
        </CoolLink>

    </main>
)