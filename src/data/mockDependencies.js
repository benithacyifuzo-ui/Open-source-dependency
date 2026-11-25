
const mockDependencies = [
  {
    id: 1,
    name: "react",
    version: "18.3.1",
    type: "Production",
    status: "Safe",
    children: [
      {
        id: 2,
        name: "loose-envify",
        version: "1.4.0",
        type: "Transitive",
        status: "Safe",
        children: [
          {
            id: 3,
            name: "js-tokens",
            version: "4.0.0",
            type: "Transitive",
            status: "Safe",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "vite",
    version: "6.0.0",
    type: "Development",
    status: "Safe",
    children: [
      {
        id: 5,
        name: "esbuild",
        version: "0.24.0",
        type: "Transitive",
        status: "Safe",
        children: [],
      },
      {
        id: 6,
        name: "postcss",
        version: "8.4.49",
        type: "Transitive",
        status: "Safe",
        children: [],
      },
    ],
  },
  {
    id: 7,
    name: "lucide-react",
    version: "0.468.0",
    type: "Production",
    status: "Safe",
    children: [],
  },
];

export default mockDependencies;
