/** @type {import('next').NextConfig} */

const nextConfig = {
    images:{
        domains:["cdn.chec.io"]
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
        serverActionsBodySizeLimit: '2mb',
      },
    
}

module.exports = nextConfig
