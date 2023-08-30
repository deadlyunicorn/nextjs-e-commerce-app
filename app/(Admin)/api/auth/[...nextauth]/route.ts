import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


const handler = NextAuth({
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
        
        
    ],
    callbacks:{
        async redirect({ url,baseUrl }){
           return '/'
        },
        async signIn({account,profile}){
            if (account?.provider === "google"){

                return true; 
                // profile?.email==process.env.ALLOWED_EMAIL;

                // return profile?.email_verified && profile.email!.endsWith("@gmail.com") 
            }
            return true 
            // profile?.email==process.env.ALLOWED_EMAIL;

        }
    },
    pages:{
        signIn:"/signin",
        error:"/signin/error"
    }

})

export {handler as GET, handler as POST}