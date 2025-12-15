# HackaTweet

Projet démarré pour tester une API type Twitter.

## Démarrage rapide (backend)
1. Copier l’exemple d’environnement puis compléter : `cp .env.example .env`  
   - `CONNECTION_STRING` : URL MongoDB (locale ou Atlas)  
   - `SESSION_SECRET` : chaîne aléatoire pour les sessions  
   - `PORT` : optionnel (défaut 3001)
2. Installer et lancer le backend :  
   ```
   cd backend
   npm install
   npm start
   ```
3. Vérifier : `GET http://localhost:3001/health` doit renvoyer `{"status":"ok"}`.

## API minimale disponible
- `POST /users/register` : `{ username, password }` → crée un utilisateur (token généré).
- `POST /users/login` : `{ username, password }` → renvoie le token associé.
- `GET /users` : liste des utilisateurs (username + dates).
- `GET /tweets` : derniers tweets (avec user + hashtags).
- `POST /tweets` : `{ text, token }` → crée un tweet (hashtags détectés dans le texte).
- `DELETE /tweets/:id` : supprime un tweet.
- `GET /hashtags` : hashtags récents.

## À faire ensuite
- Brancher un vrai chiffrement pour les mots de passe (ex: bcrypt) et ajouter une auth plus solide.
- Ajouter des tests (Jest + Supertest déjà prêts dans les dépendances).
- Initialiser le frontend (Next/React) ou le connecter au backend.
