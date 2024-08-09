docker run --name custom-map-server -p 3091:80 -v osm-data:/data/database/ -d -e DOWNLOAD_PBF=https://download.geofabrik.de/europe/romania-latest.osm.pbf -e DOWNLOAD_POLY=https://download.geofabrik.de/europe/romania.poly overv/openstreetmap-tile-server import

Comanda returneaza un ID. 

docker logs -f ID

Dupa ce returneaza exit 0, s-a finalizat importul.

docker stop ID && docker rm ID

docker run --name custom-map-server -p 3091:80 -v osm-data:/data/database/ -d -e DOWNLOAD_PBF=https://download.geofabrik.de/europe/romania-latest.osm.pbf -e DOWNLOAD_POLY=https://download.geofabrik.de/europe/romania.poly overv/openstreetmap-tile-server run
