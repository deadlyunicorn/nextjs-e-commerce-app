import Link from "next/link"

const NextPage = ({currentPage,nextPageExists}:{currentPage:number,nextPageExists:boolean}) => {
    return(
        <nav className="
            flex justify-between 
            text-blue-300 hover:text-blue-100
            text-lg">
            {
                (currentPage>1)
                ?<Link href={`./${currentPage-1}`}>Previous page</Link>
                :<div></div>
            }
            {
                nextPageExists
                ?<Link href={`./${currentPage+1}`}>Next page</Link>
                :<div></div>
            }
            
        </nav>
    )
}

export default NextPage;