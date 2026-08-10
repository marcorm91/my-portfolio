const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/es",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
