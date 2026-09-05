# Déploiement sur Synology

Les images publiées sur GHCR ciblent `linux/amd64`. Le
client et le serveur restent dans deux conteneurs afin que chaque processus
ait son propre cycle de vie, mais ils forment un seul projet Container Manager.

## Installation

1. Installez **Container Manager** depuis le Centre de paquets DSM.
2. Copiez uniquement le fichier `docker-compose.yml` situé à la racine du
   dépôt dans un dossier du NAS, par exemple
   `/volume1/docker/mage-knight/`.
3. Dans Container Manager, créez un projet depuis ce dossier et sélectionnez
   `docker-compose.yml`.
4. Démarrez le projet, puis ouvrez `http://ADRESSE_DU_NAS:8080`.

En ligne de commande, l'équivalent est :

```sh
cd /volume1/docker/mage-knight
docker compose pull
docker compose up -d
```

Le port publié peut être changé sans modifier le fichier :

```sh
MK_HTTP_PORT=8090 docker compose up -d
```

Pour exposer le jeu en HTTPS, créez dans **Panneau de configuration > Portail
de connexion > Avancé > Proxy inversé** une règle HTTPS vers
`http://127.0.0.1:8080`. Le WebSocket utilise le même domaine et le chemin
`/ws`; aucune URL d'API séparée n'est nécessaire.

La configuration du serveur web Caddy est déjà incluse dans l'image client :
aucun autre fichier de configuration n'est requis sur le NAS.

Les assets volumineux n'étant pas stockés dans Git, le conteneur client les
transmet depuis `assets.mageknightdigital.app`. Le NAS doit donc avoir accès à
ce domaine.

## Images privées

Si les paquets GHCR sont privés, authentifiez le NAS avant le premier
démarrage avec un token GitHub ayant la permission `read:packages` :

```sh
echo "VOTRE_TOKEN" | docker login ghcr.io -u VOTRE_UTILISATEUR --password-stdin
```

Pour utiliser les images d'un fork, créez un fichier `.env` dans le même
dossier :

```dotenv
MK_SERVER_IMAGE=ghcr.io/votre-compte/mk-server:latest
MK_CLIENT_IMAGE=ghcr.io/votre-compte/mk-client:latest
MK_HTTP_PORT=8080
```

## Mise à jour

```sh
docker compose pull
docker compose up -d --remove-orphans
```

Le workflow `.github/workflows/docker.yml` publie :

- `latest` depuis `main` ;
- `develop` depuis `develop` ;
- `sha-<commit>` pour chaque build ;
- les tags SemVer (`1.2.3`, `1.2`) lors d'un tag Git `v1.2.3`.
