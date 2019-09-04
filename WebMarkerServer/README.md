# MongoDB über Docker

# 1. Schritt: Verbindung zur VM auf https://vra.fh-muenster.de
ssh user@stu-fb09-546
pwd: Passw0rd

# 2. Schritt: In Web2 Verzeichnis wechseln
docker-compose up -d


# MongoDB lokal
mongo-express -u taskman -p wifhm -d taskman

# Checkout files from remote => example
git checkout tagName -- src/public/fonts