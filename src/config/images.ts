/** Local Wikimedia Commons photos — Satara region (Sonegaon Tarf Satara is ~4 km from Satara city) */
const local = (file: string) => `/images/village/${file}`;

export const villageImages = {
  hero: local('hero.jpg'),
  landscape: local('landscape.jpg'),
  temple: local('temple.jpg'),
  forest: local('forest.jpg'),
  villageView: local('village-view.jpg'),
  sataraView: local('satara-city.jpg'),
  river: local('river.jpg'),
  fort: local('fort.jpg'),
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const topicImages = {
  road: unsplash('photo-1545558014-8692077e9b5c'),
  streetLights: unsplash('photo-1519501025264-65ba15a82390'),
  school: unsplash('photo-1580582932707-520aed937b7b'),
  children: unsplash('photo-1503676260724-9fe3bc7b23ac'),
  water: unsplash('photo-1548839140-29a749e1cf4d'),
  sports: unsplash('photo-1461896836934-ffe607ba6851'),
  cleanliness: unsplash('photo-1532996122724-e3c354a0b15b'),
  housing: unsplash('photo-1480074568708-e7b720bb3f09'),
  farm: unsplash('photo-1625246333195-78d9c38ad449'),
  women: unsplash('photo-1604881991720-f91add269bed'),
  health: unsplash('photo-1576091160399-112ba8d25d1d'),
  seniors: unsplash('photo-1581579438747-1dc8d17bbce4'),
  employment: unsplash('photo-1504307651254-35680f356dfd'),
  business: unsplash('photo-1556740738-b6a63e27c4df'),
  clinic: unsplash('photo-1519494026892-80bbd2d6fd0d'),
  office: unsplash('photo-1497366216548-37526070297c'),
  shop: unsplash('photo-1556742049-0cfed4f6a45d'),
};

export const imageFallback = villageImages.hero;
