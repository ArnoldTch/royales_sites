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