import Cards from "@/components/dashboardCard";
export default function Home() {
  return (
    <main>
      <div className="container mx-auto bg-slate-100 px-10">
        <div className="py-1 pt-6">
          <h1 className="mb-3 flex justify-center text-6xl font-bold lg:text-7xl">
            Link Shortner
          </h1>
          <p className="flex lg:justify-center lg:text-2xl md:font-semibold">
            Shorten your link !!!
          </p>
        </div>
        <div className="py-1">
          <form action="" className="flex-wrap justify-center">
            <input
              type="text"
              className="mb-3 w-full rounded-lg outline outline-1 lg:rounded-sm"
            />
            <button
              type="submit"
              className="w-full rounded-sm outline outline-1 hover:border-transparent hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 lg:py-2"
            >
              Button
            </button>
          </form>
        </div>
        <div className="hidden md:flex">
          <h1 className="pt-10 text-2xl font-bold">Links you have shorten</h1>
        </div>
        {/* Card */}
        <Cards />
      </div>
    </main>
  );
}
