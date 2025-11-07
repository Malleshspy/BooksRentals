const CategoryCard = ({ name, icon }) => (
  <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
    <div className="text-4xl mb-2">{icon}</div>
    <p className="font-medium text-gray-700">{name}</p>
  </div>
);

export default CategoryCard;
