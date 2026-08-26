# Chronotir

Panneau de chronométrage numérique pour le tir à l'arc, utilisable sur tablette ou smartphone directement depuis un navigateur — sans installation.

Reprend le fonctionnement d'un panneau de chronotir physique (feux et signaux sonores) tel que décrit dans le règlement FFTA (art. B.5.4), avec :

- **Séquences** : AB, ABC, ou AB/CD (bascule automatique entre AB et CD, avec alternance de la lettre de départ à chaque volée suivante)
- **Mise en place** : 10 secondes signalées en rouge avant chaque volée
- **Tir** : voyant vert, puis jaune dans les 30 dernières secondes (signal visuel uniquement, pas de bip)
- **Fin de volée** : voyant rouge + 3 bips
- **Bascule manuelle** AB ⇄ CD en cas de souci, disponible à tout moment
- **Télécommande intégrée** : séquence, durée du tir (120s / 90s / 40s / personnalisée), son on/off, démarrer / arrêt anticipé / réinitialiser

L'affichage principal (lettres, voyant, chronomètre) occupe tout l'écran et est pensé pour rester lisible à distance. La télécommande reste discrète dans un coin.

## Utilisation

Ouvrir `index.html` dans un navigateur — aucune installation, aucune dépendance, aucun serveur nécessaire.

Une fois hébergé (voir ci-dessous), il suffit d'ouvrir l'URL sur la tablette du pas de tir.

## Hébergement sur GitHub Pages

1. Créer un nouveau repository GitHub (public suffit) et y pousser ce contenu.
2. Dans **Settings → Pages**, choisir **Deploy from a branch**, sélectionner la branche `main` et le dossier `/ (root)`.
3. GitHub fournit une URL du type `https://<utilisateur>.github.io/<nom-du-repo>/`.
4. Ouvrir cette URL sur la tablette et l'ajouter à l'écran d'accueil pour un accès direct en plein écran.

## Licence

MIT — libre d'utilisation, de modification et de partage pour les clubs de tir à l'arc.
