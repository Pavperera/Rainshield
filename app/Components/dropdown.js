import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const locations = [
  { label: "Ang Mo Kio", value: "Ang Mo Kio" },
  { label: "Bedok", value: "Bedok" },
  { label: "Bishan", value: "Bishan" },
  { label: "Boon Lay", value: "Boon Lay" },
  { label: "Bukit Batok", value: "Bukit Batok" },
  { label: "Bukit Merah", value: "Bukit Merah" },
  { label: "Bukit Panjang", value: "Bukit Panjang" },
  { label: "Bukit Timah", value: "Bukit Timah" },
  { label: "Central Water Catchment", value: "Central Water Catchment" },
  { label: "Changi", value: "Changi" },
  { label: "Choa Chu Kang", value: "Choa Chu Kang" },
  { label: "Clementi", value: "Clementi" },
  { label: "City", value: "City" },
  { label: "Geylang", value: "Geylang" },
  { label: "Hougang", value: "Hougang" },
  { label: "Jalan Bahar", value: "Jalan Bahar" },
  { label: "Jurong East", value: "Jurong East" },
  { label: "Jurong Island", value: "Jurong Island" },
  { label: "Jurong West", value: "Jurong West" },
  { label: "Kallang", value: "Kallang" },
  { label: "Lim Chu Kang", value: "Lim Chu Kang" },
  { label: "Mandai", value: "Mandai" },
  { label: "Marine Parade", value: "Marine Parade" },
  { label: "Novena", value: "Novena" },
  { label: "Pasir Ris", value: "Pasir Ris" },
  { label: "Paya Lebar", value: "Paya Lebar" },
  { label: "Pioneer", value: "Pioneer" },
  { label: "Pulau Tekong", value: "Pulau Tekong" },
  { label: "Pulau Ubin", value: "Pulau Ubin" },
  { label: "Punggol", value: "Punggol" },
  { label: "Queenstown", value: "Queenstown" },
  { label: "Seletar", value: "Seletar" },
  { label: "Sembawang", value: "Sembawang" },
  { label: "Sengkang", value: "Sengkang" },
  { label: "Sentosa", value: "Sentosa" },
  { label: "Serangoon", value: "Serangoon" },
  { label: "Southern Islands", value: "Southern Islands" },
  { label: "Sungei Kadut", value: "Sungei Kadut" },
  { label: "Tampines", value: "Tampines" },
  { label: "Tanglin", value: "Tanglin" },
  { label: "Tengah", value: "Tengah" },
  { label: "Toa Payoh", value: "Toa Payoh" },
  { label: "Tuas", value: "Tuas" },
  { label: "Western Islands", value: "Western Islands" },
  { label: "Western Water Catchment", value: "Western Water Catchment" },
  { label: "Woodlands", value: "Woodlands" },
  { label: "Yishun", value: "Yishun" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LocationMenuItem({ location, onSelect }) {
  const handleSelect = () => {
    onSelect(location);
  };

  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          onClick={handleSelect}
          className={classNames(
            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
            "block px-4 py-2 text-sm"
          )}
        >
          {location.label}
        </a>
      )}
    </Menu.Item>
  );
}

function DropdownMenuItems({ locations, onSelect }) {
  return locations.map((location, index) => (
    <LocationMenuItem key={index} location={location} onSelect={onSelect} />
  ));
}

export default function Dropdown({ location, setLocation }) {
  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation.value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {location}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-60 w-full">
          <div className="py-1">
            <DropdownMenuItems
              locations={locations}
              onSelect={handleLocationSelect}
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
