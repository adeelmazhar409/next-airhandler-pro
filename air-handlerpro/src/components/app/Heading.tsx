export default function Heading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
