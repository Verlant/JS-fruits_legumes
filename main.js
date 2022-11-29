//création des éléments

const new_main = document.createElement("main"), // crée un élément <main>
  //   new_button = document.createElement("button"), // crée un élément <button>
  new_table = document.createElement("table"); // crée un élément <table>
// new_tr = document.createElement("tr"), // crée un élément <tr> (row)
// new_td = document.createElement("td"); // crée un élément <tr> (colunm)

// ajout des éléments dans le DOM

document.body.prepend(new_main); // ajoute l'élément new_main au body en premier enfant
// new_main.prepend(new_button); // ajoute l'élément new_button au main en premier enfant
new_main.append(new_table); // ajoute l'élément new_table au body en dernier enfant

// création et ajout des élément tr et td dans l'élément new_table s'il est vide, sinon supprime les enfants de new_table pour en créer de nouveaux

function table_creation(row, column) {
  if (!new_table.hasChildNodes()) {
    for (let index = 0; index < row; index++) {
      const new_tr = document.createElement("tr");
      new_table.append(new_tr);
      for (let index = 0; index < column; index++) {
        const new_td = document.createElement("td");
        new_tr.append(new_td);
      }
    }
  } else {
    while (new_table.hasChildNodes()) {
      new_table.removeChild(new_table.lastChild);
    }
    table_creation(row, column);
  }
}

// ajout de lignes
function table_add_row(row) {
  let table_width_cells = new_table.rows[0].cells.length;
  for (let index = 0; index < row; index++) {
    let new_tr = document.createElement("tr");
    new_table.append(new_tr);
    for (let index = 0; index < table_width_cells; index++) {
      let new_td = document.createElement("td");
      new_tr.append(new_td);
    }
  }
}

// ajout de colonnes
function table_add_column(column) {
  for (let index = 0; index < new_table.rows.length; index++) {
    let this_row = new_table.rows[index];
    for (let index = 0; index < column; index++) {
      let new_td = document.createElement("td");
      this_row.append(new_td);
    }
  }
}

// suppression de lignes
function table_del_row(row) {
  for (let index = 0; index < row; index++) {
    new_table.removeChild(new_table.lastChild);
  }
}

//ajout de colonnes
function table_del_column(column) {
  for (let index = 0; index < new_table.rows.length; index++) {
    let this_row = new_table.rows[index];
    for (let index = 0; index < column; index++) {
      this_row.removeChild(this_row.lastChild);
    }
  }
}

// Données
let data = [
  ["Produit", "Mai", "Juin", "Juillet"],
  ["Abricot", 5.8, 3.37, 3.72],
  ["Fraise", 10.57, 11.11, 12.84],
  ["Poireau", 1.66, 2.34, 1.98],
];

// Affiche les données d'un array a 2 dimension (array[arrays]) dans un tableau HTML
function data_to_HTML_table(array) {
  table_creation(array.length, array[0].length);
  for (let i = 0; i < new_table.rows.length; i++) {
    for (let j = 0; j < new_table.rows[i].cells.length; j++) {
      new_table.rows[i].cells[j].textContent = array[i][j];
    }
  }
}

function add_produit(produit, price_1, price_2, price_3) {
  data.push([]);
  let last_data_index = data.length - 1;
  for (let index = 0; index < data[0].length; index++) {
    switch (index) {
      case 0:
        data[last_data_index][index] = produit;
        break;
      case 1:
        data[last_data_index][index] = price_1;
        break;
      case 2:
        data[last_data_index][index] = price_2;
        break;
      case 3:
        data[last_data_index][index] = price_3;
        break;
      default:
        console.log("Error");
    }
  }
  data_to_HTML_table(data);
}

// fonction qui renvoie le prix d'un produit demandé et au mois demandé // -> a terminé
function print_data_from_str(produit, mois) {
  let data_index_for_produit, data_index_for_mois, produit_index, mois_index;
  data.forEach((element) => {
    if (element.indexOf(produit) >= 0) {
      data_index_for_produit = data.indexOf(element);
      produit_index = element.indexOf(produit);
    } else if (element.indexOf(mois) >= 0) {
      data_index_for_mois = data.indexOf(element);
      mois_index = element.indexOf(mois);
    }
  });
  return (
    "Le " +
    data[0][0] +
    " " +
    data[data_index_for_produit][produit_index] +
    " coutait " +
    data[data_index_for_produit][mois_index] +
    "€ le kilo en " +
    data[data_index_for_mois][mois_index]
  );
}

function prix_des_produits() {
  for (let i = 1; i < data.length; i++) {
    for (let j = 1; j < data[0].length; j++) {
      console.log(
        "Le " +
          data[0][0] +
          " " +
          data[i][0] +
          " coutait " +
          data[i][j] +
          "€ le kilo en " +
          data[0][j] +
          "."
      );
    }
  }
}

data_to_HTML_table(data);
add_produit("Tomate", 4.34, 3.13, 2.77);
add_produit("Champignons", 3.25, 2.48, 2.17);
prix_des_produits();
console.log(print_data_from_str("Fraise", "Juin"));
