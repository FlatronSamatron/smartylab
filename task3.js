const airports = [
  "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN",
  "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD",
]


const routes = [
  ["DSM", "ORD"],
  ["ORD", "BGI"],
  ["BGI", "LGA"],
  ["SIN", "CDG"],
  ["CDG", "SIN"],
  ["CDG", "BUD"],
  ["DEL", "DOH"],
  ["DEL", "CDG"],
  ["TLV", "DEL"],
  ["EWR", "HND"],
  ["HND", "ICN"],
  ["HND", "JFK"],
  ["ICN", "JFK"],
  ["JFK", "LGA"],
  ["EYW", "LHR"],
  ["LHR", "SFO"],
  ["SFO", "SAN"],
  ["SFO", "DSM"],
  ["SAN", "EYW"],
]

const adjacencyList = {};

airports.forEach((airport) => (adjacencyList[airport] = []));

routes.forEach((route) => {
  const [origin, destination] = route;

  adjacencyList[origin] = [...adjacencyList[origin], destination];

  adjacencyList[destination] = [...adjacencyList[destination], origin];
});

const bfs = (start, dest) => {
  let queue = [start];
  const visited = [];

  while (queue.length) {
    const airport = queue.shift();
    console.log(airport);
    const destinations = adjacencyList[airport];

    destinations.forEach((destination) => {
      if (destination === dest) {
        console.log("found it :", destination);
        queue = [];
      } else {
        if (!visited.includes(destination)) {
          visited.push(destination);
          queue.push(destination);
        }
      }
    });
  }
  
  return visited.length;
};

console.log(bfs("BGI", "EYW"));