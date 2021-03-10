var films = [
  {    name: "Deadpool",    years: 2016,    authors : "Tim Miller" },
  {    name: "Spiderman",    years: 2002,    authors : "Sam Raimi" },
  {    name: "Scream",    years: 1996,    authors : "Wes Craven" },
  {    name: "It: chapter 1",    years: 2019,    authors : "Andy Muschietti" }
];

// Faire apparaitre le formulaire d'ajout

var btn_ajouter = document.getElementById('ajouter');
btn_ajouter.addEventListener("click", afficherForm);
var formulaire = document.querySelector("#formulaire");

function afficherForm (){
  btn_ajouter.style.display = "none";
  formulaire.style.display = "block";
};

// Fonction pour mettre la première lettre en majuscule

function capitalize(string){
  return string.charAt(0).toUpperCase()+string.slice(1);
}

// Ajouter film

var btn_enregistrer = document.getElementById('enregistrer');
btn_enregistrer.addEventListener('click',ajouterFilm);


function ajouterFilm (){
  
  if(!valid_titre(titre)){
      M.toast({html: 'Erreur dans le formulaire', displaylength: 3000});
      return afficherForm;
  }
  if(!valid_annee(annee)){
      M.toast({html: 'Erreur dans le formulaire', displaylength: 3000});
      return afficherForm;
  }
  if(!valid_real(real)){
      M.toast({html: 'Erreur dans le formulaire', displaylength: 3000});
      return afficherForm;
  }
  if(!valid_titre(titre)&&!valid_annee(annee)&&!valid_real(real)){

      M.toast({html: 'Erreur dans le formulaire', displaylength: 3000});
      return afficherForm;
  }
  
  if (titre && annee && real && valid_titre(titre) && valid_annee(annee) && valid_real(real)){

  let film = {
      name: capitalize(document.getElementById('Titre').value),
      years: Number(document.getElementById('Année').value),
      authors: capitalize(document.getElementById('Réalisateur').value)
  }

  films.push(film);
  document.querySelector("form").reset();

  console.warn('added', {films});

  M.toast({html: 'Film ajouté avec succès', displayLength: 3000});
      btn_ajouter.style.display = "block";
      formulaire.style.display ="none";
      document.querySelector("form").reset();

} 

};

// Afficher les éléments du tableau films[]

window.onload=afficherTableau;

function afficherTableau(){
var text ="";
var i;
for (var i = 0; i < films.length; i++)
{
 text +=  '<tr>' +
              '<td>' + films[i].name + '</td>' +
              '<td>' + films[i].years + '</td>' +
              '<td>' + films[i].authors + '</td>' +
              '<td>' + '<button  class="btn-small waves-effect waves-light red darken-2 supprime z-depth-3" value="'+[i]+'"><i class="material-icons right">delete</i>Supprimer</button>' + '</td>' +
          '</tr>';
};
document.getElementById("Tableau").innerHTML = text;

let bouton_supprime = document.querySelectorAll(".supprime")
bouton_supprime.forEach(film => {
  film.addEventListener("click", function() {
    return supprimeFilm(this.value);
  });
});
};

// Masquer formulaire

var btn_annuler = document.getElementById('retour');
btn_annuler.addEventListener('click',masquerForm);

btn_enregistrer.addEventListener('click',afficherTableau);

function masquerForm(){
  btn_ajouter.style.display = "block";
  formulaire.style.display ="none";
  document.querySelector("form").reset();
};

// Supprimer film

function supprimeFilm(index) {
  if (confirm("Confirmez-vous la suppression de ce film ?")) {
    films.splice(index, 1);
    M.toast({html: 'Film supprimé de la liste', displayLength: 3000});
    afficherTableau(films);}
};


// Vérifier Formulaire

let titre = document.querySelector("#Titre");
let annee = document.querySelector("#Année");
let real = document.querySelector("#Réalisateur");

titre.addEventListener("change",function(){
  valid_titre(this);
});
annee.addEventListener("change", function(){
  valid_annee(this);
});
real.addEventListener("change", function(){
  valid_real(this);
});

// Fonction verification année > 1900 < Année en cours

const valid_annee = function (valeur_annee){
  let anneeRegex = new RegExp("^([0-9]){4}$")
  let testAnnee = anneeRegex.test(valeur_annee.value)
  let n = new Date().getFullYear();
  if (testAnnee && valeur_annee.value >= 1900 && valeur_annee.value <= n){
      annee.className = "validate";
      return true;
  } else {
      annee.className = "invalid" ;
      return false;
  }
};

// Fonction verification titre

const valid_titre = function (valeur_titre){
  let testTitre = valeur_titre.value;
  console.log(testTitre)
  if (testTitre.length < 2){
      titre.className = "invalid"
      return false;
  } else {
      titre.className = "validate"
      return true;
  }
};

// Fonction verification réalisateur

const valid_real = function (valeur_real){
  let testReal = valeur_real.value;
  console.log(testReal)
  if (testReal.length < 5){
      real.className = "invalid"
      return false;
  } else {
      real.className = "validate"
      return true;
  }
};

// Faire apparaitre le choix de tri

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
 });

// Tris possibles

const tri_titre_Up = (film1,film2) => {
  if(film1.name > film2.name) return 1
  if(film1.name === film2.name) return 0
  return -1
}
const tri_titre_Down = (film1,film2) => {
  if(film1.name > film2.name) return -1
  if(film1.name === film2.name) return 0
  return 1
}
const tri_année_Up = (film1,film2) => {
  if(film1.years > film2.years) return 1
  if(film1.years === film2.years) return 0
  return -1
}
const tri_année_Down = (film1,film2) => {
  if(film1.years > film2.years) return -1
  if(film1.years === film2.years) return 0
  return 1
}

// Fonction de tris

function trier(){
  var value = this.value;
  if (value=="année") afficherTableau(films.sort(tri_année_Down))
  if (value=="titre") afficherTableau(films.sort(tri_titre_Up))
  afficherTableau
};

var choix = document.querySelector('select');
choix.addEventListener('change', trier);


