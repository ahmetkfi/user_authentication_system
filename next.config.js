
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
      appDir: true,
      serverActions:true,
  },
  env:{
    MONGO_URL:'mongodb+srv://ahmetkfi:admin123@cluster1.xnzrfvn.mongodb.net/?retryWrites=true&w=majority',
    NEXT_PUBLIC_JWT_SECRET_KEY:'b9525c44-00b8-11ee-be56-0242ac120002'
    
  }
}

module.exports = nextConfig