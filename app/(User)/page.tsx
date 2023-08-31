import { CoolButton, CoolLink } from "../(Shared)/components/Global";
import Link from "next/link";



export default async function Home() {



  return (
    <main>

      <section className="text-lg">
        <p>
          <span className="text-2xl">Welcome to <em>The Cool Webstore</em>!</span>
          <br/> This was a personal project of <u>deadlyunicorn</u> (a Web Dev - apparently),
          <br/> made for fun and in order to explore  what is possible with NextJS 
          <br/> (NextJS is a Fullstack Framework based on React) and other Tools.
          <br/>
        </p>
        <br/>
        <p> Feel free to explore the store, the different pages and the source code.
          <br/> The used tools are listed in the /about section.
          <br/> You can also see how things were put up together
          <br/> by clicking &quot;How it works&quot; down at the footer.
          <br/>
          <br/> Interested in getting in touch with me?
          <br/> You can use my <CoolLink href="https://linktr.ee/deadlyunicorn">linktr.ee</CoolLink>
          <br/> or use the contact form at the footer.
        </p>
        <br/>
        <p>
          Press the button below to explore!
        </p>

      </section>


      <div className="flex w-full justify-center mt-4">
        <CoolButton>
          <Link
            className="px-2 py-1 capitalize border rounded-md"
            href="/explore">
            Browse the store
          </Link>
        </CoolButton>
      </div>

    </main>

  )
} 
