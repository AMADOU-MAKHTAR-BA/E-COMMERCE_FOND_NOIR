document.addEventListener('DOMContentLoaded', () => {
  // initialiser le panier dans la sessionStorage 
  if (!sessionStorage.getItem('panier')) {
    sessionStorage.setItem('panier', JSON.stringify([]));
  }

  // Initialise le nombre d'articles dans la sessionStorage
  if (!sessionStorage.getItem('nombreArticles')) {
    sessionStorage.setItem('nombreArticles', '0');
  }

  // Fonction pour afficher le nombre d'articles au chargement de la page
  function afficherNombreArticles() {
    const nombreArticles = parseInt(sessionStorage.getItem('nombreArticles'), 10);
    document.querySelectorAll('.nombre-articles').forEach(element => {
      element.innerHTML = nombreArticles;
    });
  }

  // ANIMER LA MESSAGE DE BIENVENUE 
  function animerMessageBienvenue() {
    var ltrs = document.querySelectorAll(".lettre"); // Sélectionne tous les éléments avec la classe lettre

  ltrs.forEach((ltr) => {
    const texte = ltr.textContent.split(''); // je divise d'abord chaque mot en lettre 
    const parent = ltr.parentElement; //je récupère le div parent pour y stocker à nouveau mon tableau de lettre 

    ltr.remove(); //j'ai plus besoin de lui

    // Créer et insérer chaque lettre dans le DOM
    
    
    
    texte.forEach((lettre, j) => {
      const span = document.createElement("span");
      span.textContent = lettre; // Ajoute la lettre au span
      parent.appendChild(span); // Ajouter les spans dans mon élément parent 
      span.classList.add("lettre"); // l'ajout de ma classe d'animation 
      span.style.animationDelay = `${j * 0.2}s`; // ajouter mes délai 
    }); 
  });
  }
  animerMessageBienvenue();

  // Fonction pour ajouter un produit au panier
  function ajouterAuPanier(produit) {
    const panier = JSON.parse(sessionStorage.getItem('panier'));
    panier.push(produit);
    sessionStorage.setItem('panier', JSON.stringify(panier));
    afficherMessagePanier("Produit ajouté au panier !");
  }

  // Fonction pour afficher le message d'ajout au panier
  function afficherMessagePanier(texte) {
    var messageElement = document.createElement('div');
    messageElement.id = 'message-panier';
    messageElement.textContent = texte;

    document.body.appendChild(messageElement);
    messageElement.classList.add('affichage');

    setTimeout(() => {
      messageElement.classList.remove('affichage');
      messageElement.classList.add('disparition');
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 1000);
    }, 2500);
  }

  // Fonction pour incrémenter le compteur d'articles
  function incrementer_nombre_produit() {
    let contenu_nombre_articles = parseInt(sessionStorage.getItem('nombreArticles'), 10) || 0;
    contenu_nombre_articles += 1;
    sessionStorage.setItem('nombreArticles', contenu_nombre_articles.toString());

    // Met à jour l'affichage sur la page
    document.querySelectorAll('.nombre-articles').forEach(element => {
      element.innerHTML = contenu_nombre_articles;
    });
  }

  // Boutons "Ajouter au Panier"
  const boutonsAjouter = document.querySelectorAll('.ajouter-au-panier');
  boutonsAjouter.forEach(bouton => {
    bouton.addEventListener('click', (e) => {
      const produit = {
        nom: e.target.parentElement.querySelector('h3').innerText,
        prix: e.target.parentElement.querySelector('p').innerText,
        image: e.target.parentElement.querySelector('img').src
      };
      ajouterAuPanier(produit);
      incrementer_nombre_produit();
    });
  });

  // Fonction pour afficher le contenu du panier
  function afficherPanier() {
    const panier = JSON.parse(sessionStorage.getItem('panier'));
    const panierElement = document.getElementById('panier-contenu');
    panierElement.innerHTML = '';

    if (panier.length === 0) {
      panierElement.innerHTML = '<p id="panier_vide_message">VOTRE PANIER EST POUR LE MOMENT VIDE</p>';
    } else {
      panier.forEach(produit => {
        const produitElement = document.createElement('div');
        produitElement.classList.add('produit');
        produitElement.innerHTML = `
                <h3>${produit.nom}</h3>
                <p>${produit.prix}</p>
                <img src="${produit.image}" alt="${produit.nom}" width="100px">
                `;
        panierElement.appendChild(produitElement);
      });
    }
  }

  // Appeler la fonction pour afficher le panier et le nombre d'articles au chargement
  afficherNombreArticles();
  if (document.getElementById('panier-contenu')) {
    afficherPanier();
  }

  // Génération du message WhatsApp avec le lien vers le panier
  function genererMessageWhatsApp() {
    const panier = JSON.parse(sessionStorage.getItem('panier'));
    if (panier.length === 0) {
      afficherMessagePanier("CHER CLIENT , VOTRE PANIER EST POUR LE MOMENT VIDE .\n MERCI DE D'ABORD SÉLECTIONNER VOS PRODUITS ");
      return;
    }

    const lienPanier = "https://github.com/AMADOU-MAKHTAR-BA/E-COMMERCE.git/panier.html";
    const message = `Bonjour, je souhaite finaliser mon achat. Voici le lien vers mon panier : ${lienPanier}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/221755547333?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  }

  // Bouton pour le message WhatsApp
  const whatsappButton = document.querySelector('#whatsapp-button');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', genererMessageWhatsApp);
  }

  // Barre de recherche
  const barreRecherche = document.getElementById('barre-recherche');
  const produits = document.querySelectorAll('.produit');

  barreRecherche.addEventListener('input', () => {
    const recherche = barreRecherche.value.toLowerCase().trim();
    produits.forEach(produit => {
      const nomProduit = produit.querySelector('h3').innerText.toLowerCase().trim();
      produit.style.display = nomProduit.includes(recherche) ? '' : 'none';
    });
  });

}); 