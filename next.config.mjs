/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i2.wp.com'
            },
            {
                protocol: 'https',
                hostname: 'leonardo.osnova.io'
            }
        ]
    },
    webpack: (config) => {
        config.ignoreWarnings = [
            {
                module: /sequelize/
            }
        ]
        return config
    }
}

export default nextConfig
