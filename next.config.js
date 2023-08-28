/** @type {import('next').NextConfig} */

const nextConfig = {
    images:{
        domains:["cdn.chec.io",'lh3.googleusercontent.com','avatars.githubusercontent.com']
    },
    async redirects(){
        return [
            {
                source: '/explore',
                destination: '/explore/1',
                permanent: true
             },
             {
                source: '/categories',
                destination: '/#categories',
                permanent: true
             }
         ]
    },
    experimental: {
        serverActions: true,
      },
    
}

module.exports = nextConfig
