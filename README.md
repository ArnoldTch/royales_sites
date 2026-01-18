BACKEND : 

npm init -y

npm install express
npm install dotenv cors
 npm install @emailjs/browser

node server.js 

FRONTEND : 

npx create-next-app@latest frontend

npm run dev

TEST UNITAIRES : 
    OUTILS : 
    Pour le frontend :
        npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

        npm install --save-dev @testing-library/react @testing-library/jest-dom

    Pour le backend :
    npm install --save-dev jest supertest

    Les tests sont ici en front si le titre Contact, tous les champs du formulaire, afficher une erreur si aucun objet est sélectionné, un email manquant, l'envoi de formulaire et affichage d'erreur en cas d'échec d'envoi

    Les tests en backend sont ici pour verifier si l'envoi de mail est en succès, accepter un message vide

    test fait avec succès.


Élaborer une architecture logicielle : Frontend (NextJS / Tailwind CSS) + Backend (Node.js avec Express et des routes API)

Préparer l'intégrité du code : validation de données

Explications choix des technologies : 

1. Architecture globale – Frontend / Backend séparés

Le projet repose sur une séparation claire entre le frontend et le backend. Cette organisation permet de distinguer précisément les responsabilités : le frontend est dédié à l’interface utilisateur et à l’expérience, tandis que le backend gère la logique métier, la sécurité et l’accès aux données.
Cette séparation améliore la scalabilité du projet, car chaque partie peut être déployée et maintenue indépendamment. Elle renforce également la sécurité, notamment pour la gestion des clés API et des données sensibles, qui restent exclusivement côté serveur.
Enfin, l’API développée est réutilisable, ce qui ouvre la possibilité de créer ultérieurement une application mobile, tout en facilitant la mise en place de tests unitaires indépendants pour chaque couche.

2. Frontend – Next.js

Le choix s’est porté sur Next.js avec l’App Router pour le développement du frontend. Ce framework permet un rendu côté serveur natif, un point essentiel pour le référencement naturel sur Google, particulièrement important pour un site de type vitrine et recherche de professionnels.
Next.js apporte également de très bonnes performances grâce au code splitting automatique et à l’optimisation intégrée des images. Son système de routing basé sur la structure des fichiers simplifie l’organisation du projet et améliore la lisibilité du code.

Certaines alternatives ont été écartées : Create React App ne propose pas de Server-Side Rendering et n’est plus maintenu activement, Gatsby est trop complexe pour un projet de cette nature.

3. Frontend – React 

Son écosystème mature offre un large choix de bibliothèques et de solutions éprouvées. Les facilités comme useState et useEffect permettent d’écrire un code plus lisible et plus concis que les composants basés sur des classes.
Le Virtual DOM garantit de bonnes performances, même avec des interfaces dynamiques et la communauté très active 


4. Frontend – Tailwind CSS

Pour la mise en forme, Tailwind CSS a été choisi selon une approche utility-first. Cette solution permet de développer plus rapidement sans écrire de CSS personnalisé, tout en conservant un design cohérent.
Tailwind offre d’excellentes performances grâce à la purge automatique des classes inutilisées, ce qui réduit fortement la taille du bundle final. Le responsive design est natif grâce aux préfixes (sm, md, lg), et le design system est centralisé via le fichier tailwind.config.js, facilitant la personnalisation et la cohérence visuelle.


5. Backend – Node.js et Express

Le backend a été développé avec Node.js et Express.js. L’un des principaux avantages de ce choix est l’utilisation du même langage, JavaScript, côté frontend et backend, ce qui évite les changements de contexte et accélère le développement.
Node.js est particulièrement performant pour la gestion des entrées/sorties grâce à son modèle non bloquant, ce qui le rend adapté aux API et à la gestion des requêtes concurrentes. Express, quant à lui, offre une structure simple et claire, basée sur des routes et des middlewares, facilitant la maintenance et l’évolution du projet.
L’écosystème npm, très riche, permet d’intégrer rapidement des fonctionnalités essentielles comme l’envoi d’emails, la gestion des variables d’environnement ou la sécurité.

Des frameworks comme Django, Laravel ou Spring Boot ont été écartés car jugés trop lourds ou inadaptés au contexte d’un projet JavaScript orienté API.

6. Backend – Nodemailer et Gmail SMTP

Pour l’envoi des emails, notamment les confirmations de rendez-vous, Nodemailer avec Gmail SMTP a été retenu. Cette solution est gratuite jusqu’à un volume largement suffisant pour le projet, fiable grâce à l’infrastructure Google, et simple à mettre en place.
L’envoi des emails est entièrement géré côté backend, garantissant que les clés sensibles ne sont jamais exposées au client. Nodemailer offre également une grande flexibilité, permettant de modifier facilement le fournisseur SMTP ou de personnaliser les templates HTML.

Des solutions comme SendGrid ont été écartées en raison de leur coût, EmailJS pour des raisons de sécurité, et AWS SES en raison de sa configuration plus complexe.

**ADR** :

1. Contexte général

Dans le cadre du développement de la plateforme, plusieurs décisions structurantes ont dû être prises concernant l’architecture globale, le choix des technologies frontend et backend, le système de styles, l’envoi d’emails et la stratégie de tests.
Les objectifs principaux étaient d’assurer de bonnes performances, une architecture évolutive, une maintenance facilitée, une sécurité renforcée et une expérience utilisateur optimale.

2. Décisions d’architecture et de technologies
2.1 Architecture Frontend / Backend séparée
Décision

Le projet adopte une architecture avec un frontend Next.js distinct d’un backend Node.js/Express exposant une API REST.

Justification

Cette séparation permet une répartition claire des responsabilités : le frontend se concentre sur l’interface utilisateur et l’expérience, tandis que le backend gère la logique métier, la sécurité et l’accès aux données.
Elle facilite également la scalabilité du projet, le déploiement indépendant des deux parties, la réutilisation de l’API pour une application mobile future et l’écriture de tests unitaires ciblés par couche.

Alternatives considérées

Next.js API Routes : couplage fort frontend/backend

Serverless Functions : complexité inutile pour ce projet

Backend-as-a-Service (Firebase) : dépendance externe et coûts potentiels

Inconvénients

Deux serveurs à maintenir

Configuration CORS nécessaire

Deux pipelines de déploiement

Conséquences

API réutilisable

Travail frontend et backend en parallèle

Architecture plus robuste et évolutive

2.2 Frontend – Next.js 14 avec App Router
Décision

Utilisation de Next.js 14 avec le nouveau App Router.

Justification

Next.js offre un rendu côté serveur et une génération statique, essentiels pour le SEO et les performances. L’App Router apporte une structure claire basée sur les fichiers, des layouts imbriqués et l’utilisation des Server Components.
L’intégration native avec Vercel simplifie le déploiement et garantit de bonnes performances en production.

Alternatives considérées

Create React App : pas de SSR, projet abandonné

Gatsby : trop complexe pour un site vitrine


Inconvénients

Courbe d’apprentissage liée au nouvel App Router

Dépendance relative à l’écosystème Vercel

Conséquences

SEO optimisé

Temps de chargement réduit

Déploiement simplifié

2.3 Frontend – Tailwind CSS
Décision

Utilisation de Tailwind CSS selon une approche utility-first.

Justification

Tailwind permet un développement rapide sans écrire de CSS personnalisé, tout en assurant une cohérence visuelle grâce à un design system intégré. La purge automatique garantit un bundle CSS léger et de bonnes performances.
Le responsive design est nativement pris en charge grâce aux breakpoints intégrés.

Alternatives considérées

CSS Modules : trop verbeux

Styled Components : surcharge runtime

Bootstrap : trop rigide et opinioné

Inconvénients

HTML plus chargé en classes

Courbe d’apprentissage initiale

Conséquences

Productivité accrue

CSS léger en production

Cohérence graphique sur l’ensemble du site

2.4 Backend – Node.js avec Express
Décision

Utilisation de Node.js avec le framework Express.js pour le backend.

Justification

Le choix de Node.js permet d’utiliser JavaScript sur l’ensemble du projet, réduisant le changement de contexte entre frontend et backend. Express offre une structure simple et efficace pour créer une API REST.
Le modèle non bloquant de Node.js est adapté à la gestion de requêtes concurrentes et à l’envoi d’emails.

Alternatives considérées

Django (Python) : trop lourd pour une API simple

Laravel (PHP) : équipe orientée JavaScript

Spring Boot (Java) : surdimensionné pour le projet

Conséquences

Backend performant et maintenable

Intégration simple avec le frontend

Large écosystème npm

2.5 Envoi d’emails – Nodemailer avec Gmail SMTP
Décision

Utilisation de Nodemailer avec Gmail SMTP pour l’envoi d’emails.

Justification

Cette solution est gratuite, fiable et rapide à configurer. Les emails sont envoyés côté backend, garantissant que les clés sensibles ne sont jamais exposées au client.
Elle permet également une migration facile vers un autre fournisseur SMTP si nécessaire.

Alternatives considérées

EmailJS : clés exposées côté client

SendGrid : coûts au-delà d’un faible volume

AWS SES : configuration complexe

Resend : solution récente, moins mature

Inconvénients

Limite de 500 emails par jour

Configuration d’un mot de passe d’application Gmail

Conséquences

Coût nul

Envoi d’emails fiable

Sécurité renforcée

2.6 Tests – Jest comme framework principal
Décision

Utilisation de Jest pour les tests unitaires et d’intégration, avec React Testing Library pour le frontend et Supertest pour le backend.

Justification

Jest est un standard de l’industrie, offrant assertions, mocking et couverture de tests dans un seul outil. Il permet une exécution rapide et parallèle des tests, ainsi qu’un mode watch facilitant le développement.
La séparation frontend/backend permet de tester chaque couche indépendamment.

Alternatives considérées

Vitest : moins mature

Mocha + Chai : configuration plus complexe

Jasmine : écosystème plus restreint

Inconvénients

Temps initial de configuration

Courbe d’apprentissage pour l’écriture des tests

Conséquences

Détection précoce des bugs

Refactoring sécurisé

Amélioration de la qualité globale du code