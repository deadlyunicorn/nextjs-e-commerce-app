import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github"


const handler = NextAuth({
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ],
    callbacks:{
        async redirect({ url,baseUrl }){
           return '/admin'
        }
    }

})

export {handler as GET, handler as POST}