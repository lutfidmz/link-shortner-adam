import Details from "@/components/linkDetails";

export default function Index({ params }: { params: { id: any } }) {
  return (
    <div className="container mx-auto bg-slate-100 px-10">
      {/* Details */}
      <Details params={params} />
    </div>
  );
}
