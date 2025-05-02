/** @type {import('next').NextConfig} */
const config = {
    images: {
        domains: ['picsum.photos'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'replicate.com'
            },
            {
                protocol: 'https',
                hostname: 'replicate.delivery'
            },
            {
                protocol: 'https',
                hostname: 'jgvktppjdbligdhehesn.supabase.co'
            },
            {
                protocol: 'https',
                hostname: 'ttfaaaaajrvvwwboooo.supabase.co'
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co'
            }
        ]
    }
}

export default config
