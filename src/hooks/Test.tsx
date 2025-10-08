import { useCategories } from "@/hooks/useCategory";

function TestCategories() {
  const { data, isLoading, error } = useCategories();

  console.log("Categories data:", data);
  console.log("Is loading:", isLoading);
  console.log("Error:", error);

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Categories Test</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default TestCategories;