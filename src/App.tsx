import { useState } from "react";
import { Blurhash } from "react-blurhash";
import data from "./restaurants.json";
import woltlogo from "./assets/woltlogoblack.svg";
import getDistance from "geolib/es/getPreciseDistance";

interface Restaurant {
  blurhash: string;
  city: string;
  currency: string;
  delivery_price: number;
  description: string;
  image: string;
  location: [number, number];
  name: string;
  online: boolean;
  tags: string[];
}

const restaurants = data.restaurants.map((restaurant) => {
  const randomDeliveryPrice = Math.random() * 1500;
  const roundedDeliveryPrice = Math.round(randomDeliveryPrice * 10) / 10;

  return {
    ...restaurant,
    delivery_price: restaurant.currency === "EUR" ? +roundedDeliveryPrice.toFixed(2) : randomDeliveryPrice,
  };
}) as Restaurant[];

const getCurrentLocation = (): [number, number] => {
  const maxLat = Math.max(...restaurants.map((r) => r.location[0]));
  const minLat = Math.min(...restaurants.map((r) => r.location[0]));
  const maxLng = Math.max(...restaurants.map((r) => r.location[1]));
  const minLng = Math.min(...restaurants.map((r) => r.location[1]));

  const randomLat = Math.random() * (maxLat - minLat) + minLat;
  const randomLng = Math.random() * (maxLng - minLng) + minLng;

  return [randomLat, randomLng];
};

const location = getCurrentLocation();

const Navbar = () => {
  return (
    <div className="border-b bg-body p-4 w-full flex items-center justify-center">
      <div className="w-[1200px] flex items-center justify-between">
        <img src={woltlogo} className="h-[32px] w-[80px]" alt="Wolt Logo" />
      </div>
    </div>
  );
};

const ImageWithBlurhashFallback = ({ src, blurhash }: { src: string; blurhash: string }) => {
  const [displayBlurhash, setDisplayBlurhash] = useState(true);

  return (
    <>
      {displayBlurhash && (
        <div className="absolute top-0 left-0 w-full h-[200px] z-10">
          <Blurhash hash={blurhash} width={"100%"} height={200} />
        </div>
      )}
      <img loading="lazy" onLoad={() => setDisplayBlurhash(false)} className="absolute top-0 left-0 w-full h-[200px]" src={src} />
    </>
  );
};

const Restaurant = ({ restaurant }: { restaurant: Restaurant }) => {
  const distance = getDistance(location, restaurant.location);
  return (
    <div className="border w-full rounded-lg shadow hover:scale-[1.03] duration-300">
      <div className="rounded-lg overflow-clip border flex flex-col w-full h-[200px] relative">
        <ImageWithBlurhashFallback src={restaurant.image} blurhash={restaurant.blurhash} />
      </div>
      <div className="p-4">
        <p className="text-xl">{restaurant.name}</p>
        <p>{restaurant.description}</p>
        <p className="text-sm text-black/80">{restaurant.tags.join(", ")}</p>
        <p className="text-sm text-black/80">{restaurant.city}</p>
        <p className="text-sm text-black/80">{(restaurant.delivery_price / 100).toFixed(2)}€</p>
        <p>{distance}</p>
      </div>
    </div>
  );
};

const RestaurantList = ({ restaurants }: { restaurants: Restaurant[] }) => {
  type SortOptions = "name" | "delivery_price" | "closest";
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [sortBy, setSortBy] = useState<SortOptions>("name");

  const filteredRestaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(filter.toLowerCase()));

  const sortByName = (a: string, b: string) => a.localeCompare(b);
  const sortByDeliveryPrice = (a: number, b: number) => a - b;
  const sortByDistanceFromLocation = (a: [number, number], b: [number, number]) => getDistance(location, a) - getDistance(location, b);

  const sortedRestaurants = [
    ...filteredRestaurants.sort((a, b) => {
      if (sortBy === "delivery_price") return sortByDeliveryPrice(a.delivery_price, b.delivery_price);
      if (sortBy === "name") return sortByName(a.name, b.name);
      if (sortBy === "closest") return sortByDistanceFromLocation(a.location, b.location);
      return 0;
    }),
  ];

  const sortedRestaurantsByDirection = sortAsc ? sortedRestaurants : sortedRestaurants.reverse();

  const handleSortOptionClick = (key: SortOptions) => {
    if (sortBy !== key) {
      setSortAsc(true);
      setSortBy(key);
      return;
    }

    //clicking the same key switches the direction
    if (sortBy === key) {
      setSortAsc((v) => !v);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <input
        placeholder="Search from restaurants"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        className="p-2 border rounded-lg"
      />
      <div>
        Sort by
        <div className="flex gap-2">
          <span onClick={() => handleSortOptionClick("name")}>name</span>
          <span onClick={() => handleSortOptionClick("delivery_price")}>delivery price</span>
          <span onClick={() => handleSortOptionClick("closest")}>closest</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full xl:w-[1200px]">
        {sortedRestaurantsByDirection.map((restaurant: Restaurant) => {
          return <Restaurant key={restaurant.name} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
};

function App() {
  return (
    <div data-testid="app" className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col p-4 sm:p-8 gap-8">
        <h1 className="text-3xl">Kaikki ravintolat</h1>
        <RestaurantList restaurants={restaurants} />
      </div>
    </div>
  );
}

export default App;
