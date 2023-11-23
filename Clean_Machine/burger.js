// Code om de webshop te initialiseren
document.addEventListener('DOMContentLoaded', function() {
  // Database-initialisatie
  var database = null;
  let afrekenen = false
  database = openDatabase('Clean_Machine', '1.0', 'Clean_Machine', 1024 * 1024);

  // Functie om query's uit te voeren op de database
  function uitvoerenQuery(query, variabelen) {
      database.transaction(function(transactie) {
          transactie.executeSql(query, variabelen);
      });
  }
  
 
  

  // Functie om de status bij te werken
  function updateStatus(string) {
      if(document.body.id === "managerpage"){
          var statusElement = document.getElementById("status");
          statusElement.innerHTML += string;
      }
  }

  // Bestellingen functionaliteit
  function maakTabellen() {
      var queryOrderDetails = "CREATE TABLE IF NOT EXISTS BESTELREGELS " +
     "(BestelRegels INTEGER PRIMARY KEY AUTOINCREMENT, " +
     "Bestelnummer INTEGER NOT NULL, " +
     "ArtikelID INTEGER NOT NULL, " +
     "Aantal INTEGER NOT NULL, "+
     "Prijs INTEGER NOT NULL,"+
     "MedewerkerID INTEGER NOT NULL,"+
     "FOREIGN KEY (Bestelnummer) REFERENCES BESTELLINGEN (Bestelnummer), " +
     "FOREIGN KEY (ArtikelID) REFERENCES ARTIKELEN (ArtikelID))";

updateStatus("Bestelregels tabel aangemaakt<br>");
uitvoerenQuery(queryOrderDetails, []);

      // Tabel voor klanten
      var queryCustomers = "CREATE TABLE IF NOT EXISTS KLANTEN " +
      "(KlantID integer PRIMARY KEY AUTOINCREMENT, " +
      "KlantNaam varchar(100) NOT NULL, " +
      "GeboorteDatum date NOT NULL, " +
      "Woonplaats varchar(100) NOT NULL, " +
      "StraatNaam varchar(100) NOT NULL, " +
      "StraatNummer varchar(10) NOT NULL, " +
      "Postcode varchar(10) NOT NULL, " +
      "EmailAdres varchar(100) NOT NULL)";

      updateStatus("Klanten tabel aangemaakt<br>");
      uitvoerenQuery(queryCustomers, []);

      var queryProductCategories = "CREATE TABLE IF NOT EXISTS PRODUCTCATEGORIEËN " +
      "(CategorieID INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "CategorieNaam VARCHAR(100) UNIQUE NOT NULL, " +
      "Beschrijving TEXT)";

      updateStatus("Productcategorie tabel aangemaakt<br>");
      uitvoerenQuery(queryProductCategories, []);

      // Functie om de artikelentabel aan te maken
      var queryProduct = "CREATE TABLE IF NOT EXISTS ARTIKELEN " +
      "(ArtikelID INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "CategorieID INTEGER NOT NULL, " +
      "ArtikelOmschrijving VARCHAR(255) NOT NULL, " +
      "Prijs DECIMAL(7,2) NOT NULL, " +
      "FOREIGN KEY (CategorieID) REFERENCES PRODUCTCATEGORIEËN (CategorieID))";

      updateStatus("Artikelen tabel aangemaakt<br>");
      uitvoerenQuery(queryProduct, []);

      var queryOrders = `
      CREATE TABLE IF NOT EXISTS BESTELLINGEN (
      Bestelnummer INTEGER PRIMARY KEY AUTOINCREMENT,
      Klantnummer INTEGER NOT NULL,
      FOREIGN KEY (Klantnummer) REFERENCES KLANTEN(Klantnummer))`;

      updateStatus("Bestellingen tabel aangemaakt<br>");
      uitvoerenQuery(queryOrders, []);
      
      var queryEmployees = "CREATE TABLE IF NOT EXISTS MEDEWERKERS " +
      "(MedewerkerID INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "Medewerkernaam VARCHAR(100) NOT NULL, " +
      "Geboortedatum DATE NOT NULL, " +
      "Geslacht VARCHAR(10) NOT NULL, " +
      "Functie VARCHAR(100) NOT NULL, " +
      "Telefoonnummer VARCHAR(15) NOT NULL, " +
      "Emailadres VARCHAR(100) NOT NULL)";

      updateStatus("Medewerkers tabel aangemaakt<br>");
      uitvoerenQuery(queryEmployees, []);

      
  }

  function AddEmployees() {
      var dummyEmployees = [
          { Medewerkernaam: "John Doe", Geboortedatum: "1990-05-15", Geslacht: "Man", Functie: "Verkoper", Telefoonnummer: "123-456-7890", Emailadres: "john@example.com" },
          { Medewerkernaam: "Jane Smith", Geboortedatum: "1985-08-22", Geslacht: "Vrouw", Functie: "Manager", Telefoonnummer: "987-654-3210", Emailadres: "jane@example.com" },
          { Medewerkernaam: "Bob Johnson", Geboortedatum: "1992-03-10", Geslacht: "Man", Functie: "Technicus", Telefoonnummer: "555-123-4567", Emailadres: "bob@example.com" },
          { Medewerkernaam: "Maria Garcia", Geboortedatum: "1988-12-03", Geslacht: "Vrouw", Functie: "Administrateur", Telefoonnummer: "777-888-9999", Emailadres: "maria@example.com" },
          { Medewerkernaam: "Michael Brown", Geboortedatum: "1995-06-20", Geslacht: "Man", Functie: "Magazijnmedewerker", Telefoonnummer: "555-987-6543", Emailadres: "michael@example.com" }
      ];

      EmployeesCheck(function(zijnToegevoegd) {
          if (!zijnToegevoegd) {
              dummyEmployees.forEach(function(medewerker) {
                  var query = "INSERT INTO MEDEWERKERS (Medewerkernaam, Geboortedatum, Geslacht, Functie, Telefoonnummer, Emailadres) VALUES (?, ?, ?, ?, ?, ?)";
                  var variabelen = [medewerker.Medewerkernaam, medewerker.Geboortedatum, medewerker.Geslacht, medewerker.Functie, medewerker.Telefoonnummer, medewerker.Emailadres];
  
                  // Roep de functie uitvoerenQuery aan om de query uit te voeren
                  uitvoerenQuery(query, variabelen);
              });
          } else {
              console.log("Medewerkers zijn al toegevoegd.");
          }
      });
  }
  
  function EmployeesCheck(callback) {
      var query = "SELECT COUNT(*) AS count FROM MEDEWERKERS";
      var variabelen = [];
  
      database.transaction(function(transactie) {
          transactie.executeSql(query, variabelen, function(transactie, resultaat) {
              var rowCount = resultaat.rows.item(0).count;
              if (rowCount > 0) {
                  callback(true);
              } else {
                  callback(false);
              }
          });
      });
  }
  
  AddEmployees();
  

  
  
  function AddCustomer() {
      var klantNaam = document.getElementById("KlantNaam").value;
      var geboorteDatum = document.getElementById("GeboorteDatum").value;
      var woonplaats = document.getElementById("Woonplaats").value;
      var straatNaam = document.getElementById("StraatNaam").value;
      var straatNummer = document.getElementById("StraatNummer").value;
      var postcode = document.getElementById("Postcode").value;
      var emailAdres = document.getElementById("EmailAdres").value;
  
      var query = "INSERT INTO KLANTEN (KlantNaam, GeboorteDatum, Woonplaats, StraatNaam, StraatNummer, Postcode, EmailAdres) " +
                  "VALUES (?, ?, ?, ?, ?, ?, ?)";
  
      var variabelen = [klantNaam, geboorteDatum, woonplaats, straatNaam, straatNummer, postcode, emailAdres];
      uitvoerenQuery(query, variabelen);

      if(document.body.id === "managerpage"){
          viewKlanten()
      }
  
      updateStatus("Klant toegevoegd aan tabel<br>");
      if (afrekenen === true && emailAdres !== ""){
          var query = "SELECT KlantID FROM KLANTEN WHERE EmailAdres = ?";
          var variabelen = [emailAdres];
          

          database.transaction(function(transactie) {
              transactie.executeSql(query, variabelen, function(transactie, resultaat) {
              // Verwerk hier het resultaat van de query
              if (resultaat.rows.length > 0) {
                  var LaatsteklantID = resultaat.rows.item(0).KlantID;
                  if(document.body.id === "homepage"){
                      voegBestellingToe(LaatsteklantID)
                  }
              } else {
                  alert("Klant niet gevonden");
              }
              }, function(transactie, fout) {
                  // Hier kun je foutafhandeling toevoegen als er een fout optreedt bij de query
                  alert("Fout bij uitvoeren van de query: " + fout.message);
              });
          });
      }
      else{
          alert('Vul uw e-mailadres in en zorg ervoor dat er tenminste 1 product in uw winkelwagen zit')
      }


  }

  function voegBestellingToe(LaatsteklantID) {
      var query = "INSERT INTO BESTELLINGEN (Klantnummer) VALUES (?)";
      var variabelen = [LaatsteklantID]

      uitvoerenQuery(query, variabelen);

      updateStatus("Bestelling toegevoegd aan tabel<br>");

      var laatsteBestellingIDQuery = "SELECT Bestelnummer FROM BESTELLINGEN WHERE Klantnummer = ?";
      var variabelen = [LaatsteklantID];
      
      database.transaction(function(transactie) {
          transactie.executeSql(laatsteBestellingIDQuery, variabelen, function(transactie, resultaat) {
              if (resultaat.rows.length > 0) {
                  var laatsteBestellingID = resultaat.rows.item(0).Bestelnummer; // Gebruik de juiste kolomnaam: Bestelnummer
                  VoegBestelregelsToe(laatsteBestellingID)
              } else {
                  alert("Fout bij ophalen laatste BestellingID.<br>");
              }
          });
      });        

      
  }



  function voegProductcategorieenToe() {
      var productcategorieen = [
          { CategorieNaam: "Hygiene" },
          { CategorieNaam: "Machines" },
          { CategorieNaam: "Wasmiddelen" },
          { CategorieNaam: "Materialen" },
          { CategorieNaam: "Afval" },
      ];

      zijnProductcategorieenAlToegevoegd(function(zijnToegevoegd) {
          if (!zijnToegevoegd) {
              // Itereer over de productcategorieën en voeg ze in de database in
              productcategorieen.forEach(function(categorie) {
                  var query = "INSERT INTO PRODUCTCATEGORIEËN (CategorieNaam, Beschrijving) VALUES (?, ?)";
                  var variabelen = [categorie.CategorieNaam, categorie.Beschrijving];
  
                  // Roep de functie uitvoerenQuery aan om de query uit te voeren
                  uitvoerenQuery(query, variabelen);
              });
          } else {
              console.log("Productcategories zijn al toegevoegd.");
          }
      });
  }
  
  // Functie om te controleren of er al gegevens in de PRODUCTCATEGORIEEN tabel aanwezig zijn
  function zijnProductcategorieenAlToegevoegd(callback) {
      var query = "SELECT COUNT(*) AS count FROM PRODUCTCATEGORIEËN";
      var variabelen = [];
  
      database.transaction(function(transactie) {
          transactie.executeSql(query, variabelen, function(transactie, resultaat) {
              var rowCount = resultaat.rows.item(0).count;
              if (rowCount > 0) {
                  // Er zijn al productcategorieën toegevoegd, roep de callback aan
                  callback(true);
              } else {
                  // Er zijn nog geen productcategorieën toegevoegd, roep de callback aan
                  callback(false);
              }
          });
      });
  }
  
  // Roep de functie voegProductcategorieenToe aan om productcategorieën toe te voegen (indien nodig)
  voegProductcategorieenToe();
  

  // Een array met de productgegevens
var producten = [
  { categorieID: 1, artikelOmschrijving: 'rode handzeep', prijs: 10.00 },
  { categorieID: 1, artikelOmschrijving: 'blauwe handzeep', prijs: 12.00 },
  { categorieID: 1, artikelOmschrijving: 'groene zeep', prijs: 14.00 },
  { categorieID: 1, artikelOmschrijving: 'een enkele rol', prijs: 10.00 },
  { categorieID: 1, artikelOmschrijving: 'meerdere rollen', prijs: 12.00 },
  { categorieID: 1, artikelOmschrijving: 'roze luchtverfrisser', prijs: 10.00 },
  { categorieID: 1, artikelOmschrijving: 'gele luchtverfrisser', prijs: 12.00 },
  { categorieID: 1, artikelOmschrijving: 'toiletborstel', prijs: 10.00 },

  { categorieID: 2, artikelOmschrijving: 'blije stofzuiger', prijs: 10.00 },
  { categorieID: 2, artikelOmschrijving: 'zielige stofzuiger', prijs: 12.00 },
  { categorieID: 2, artikelOmschrijving: 'blauwe tapijtreiniger', prijs: 10.00 },
  { categorieID: 2, artikelOmschrijving: 'gele tapijtreiniger', prijs: 12.00 },
  { categorieID: 2, artikelOmschrijving: 'enkele hogedrukreiniger', prijs: 10.00 },
  { categorieID: 2, artikelOmschrijving: 'all in one hogedrukreiniger', prijs: 12.00 },

  { categorieID: 3, artikelOmschrijving: 'witte capsules', prijs: 10.00 },
  { categorieID: 3, artikelOmschrijving: 'kleur capsules', prijs: 12.00 },
  { categorieID: 3, artikelOmschrijving: 'wit waspoeder', prijs: 10.00 },
  { categorieID: 3, artikelOmschrijving: 'kleur waspoeder', prijs: 12.00 },
  { categorieID: 3, artikelOmschrijving: 'paars vloeibaar wasmiddel', prijs: 10.00 },
  { categorieID: 3, artikelOmschrijving: 'blauw vloeibaar wasmiddel', prijs: 12.00 },

  { categorieID: 4, artikelOmschrijving: 'enkele spons', prijs: 10.00 },
  { categorieID: 4, artikelOmschrijving: 'meerdere sponzen', prijs: 12.00 },
  { categorieID: 4, artikelOmschrijving: 'enkele reinigingsdoek', prijs: 10.00 },
  { categorieID: 4, artikelOmschrijving: 'meerdere reinigingsdoeken', prijs: 12.00 },
  { categorieID: 4, artikelOmschrijving: 'emmer lol', prijs: 10.00 },
  { categorieID: 4, artikelOmschrijving: 'enkele bezem', prijs: 10.00 },
  { categorieID: 4, artikelOmschrijving: 'meerdere bezems', prijs: 12.00 },

  { categorieID: 5, artikelOmschrijving: 'enkele afvalzak', prijs: 10.00 },
  { categorieID: 5, artikelOmschrijving: 'meerdere afvalzakken', prijs: 12.00 },
  { categorieID: 5, artikelOmschrijving: 'afvalbak', prijs: 10.00 },
  { categorieID: 5, artikelOmschrijving: 'pedaalemmer', prijs: 10.00 },
  { categorieID: 5, artikelOmschrijving: 'asbak', prijs: 10.00 },
];

// Functie om producten in de ARTIKELEN tabel in te voegen
// Functie om te controleren of er al gegevens in de ARTIKELEN tabel aanwezig zijn
function zijnProductenAlToegevoegd(callback) {
  var query = "SELECT COUNT(*) AS count FROM ARTIKELEN";
  var variabelen = [];

  database.transaction(function(transactie) {
      transactie.executeSql(query, variabelen, function(transactie, resultaat) {
          var rowCount = resultaat.rows.item(0).count;
          if (rowCount > 0) {
              // Er zijn al producten toegevoegd, roep de callback aan
              callback(true);
          } else {
              // Er zijn nog geen producten toegevoegd, roep de callback aan
              callback(false);
          }
      });
  });
}

// Functie om producten in de ARTIKELEN tabel in te voegen
function voegProductenToe() {
  // Controleer eerst of er al producten zijn toegevoegd
  zijnProductenAlToegevoegd(function(zijnToegevoegd) {
      if (!zijnToegevoegd) {
          // Itereer over de producten en voeg ze in de database in
          producten.forEach(function(product) {
              var query = "INSERT INTO ARTIKELEN (CategorieID, ArtikelOmschrijving, Prijs) VALUES (?, ?, ?)";
              var variabelen = [product.categorieID, product.artikelOmschrijving, product.prijs];
              
              // Roep de functie uitvoerenQuery aan om de query uit te voeren (veronderstelt dat deze functie bestaat)
              uitvoerenQuery(query, variabelen);
          });
      } else {
          console.log("Producten zijn al toegevoegd.");
      }
  });
}

// Roep de functie voegProductenToe aan om de producten in te voegen (indien nodig)
voegProductenToe();

  // Functie om een artikel toe te voegen
  function voegArtikelToe() {
      var categorieID = parseInt(document.getElementById("CategorieID").value);
      var artikelOmschrijving = document.getElementById("ArtikelOmschrijving").value;
      var prijs = parseFloat(document.getElementById("Prijs").value);

      var query = "INSERT INTO ARTIKELEN (CategorieID, ArtikelOmschrijving, Prijs) VALUES (?, ?, ?)";
      var variabelen = [categorieID, artikelOmschrijving, prijs];

      uitvoerenQuery(query, variabelen);

      updateStatus("Artikel toegevoegd aan tabel<br>");
  }

  
  // Functie om een nieuwe medewerker toe te voegen
  function voegMedewerkerToe() {
      var medewerkerNaam = document.getElementById("MedewerkerNaam").value;
      var geboortedatum = document.getElementById("Geboortedatum").value;
      var geslacht = document.getElementById("Geslacht").value;
      var functie = document.getElementById("Functie").value;
      var telefoonnummer = document.getElementById("Telefoonnummer").value;
      var emailMedewerker = document.getElementById("EmailMedewerker").value;

      var query = "INSERT INTO MEDEWERKERS (MedewerkerNaam, Geboortedatum, Geslacht, Functie, Telefoonnummer, EmailMedewerker) " +
                  "VALUES (?, ?, ?, ?, ?, ?)";

      var variabelen = [medewerkerNaam, geboortedatum, geslacht, functie, telefoonnummer, emailMedewerker];
      uitvoerenQuery(query, variabelen);

      updateStatus("Medewerker toegevoegd aan tabel<br>");
  }

  function toonBestelregels() {
      var query = "SELECT * FROM Orderdetails";
  
      database.transaction(function (transactie) {
          transactie.executeSql(query, [], function (transactie, resultaat) {
              var tabel = "<table><tr><th>Bestelnummer</th><th>ArtikelID</th><th>Aantal</th><th>Prijs</th><th>MedewerkerID</th></tr>";
  
              for (var i = 0; i < resultaat.rows.length; i++) {
                  var rij = resultaat.rows.item(i);
                  tabel += "<tr><td>" + rij.Bestelnummer + "</td><td>" + rij.ArtikelID + "</td><td>" + rij.Aantal + "</td><td>" + rij.Prijs + "</td><td>" + rij.MedewerkerID + "</td></tr>";
              }
  
              tabel += "</table>";
  
              // Plaats de tabel op de pagina, bijvoorbeeld in een HTML-element met een bepaalde ID
              var tabelContainer = document.getElementById("bestelregelsTabel");
              tabelContainer.innerHTML = tabel;
          });
      });
  }
  

  function viewKlanten() {
      var query = "SELECT KlantID, KlantNaam, GeboorteDatum, Woonplaats, StraatNaam, StraatNummer, Postcode, EmailAdres FROM KLANTEN";
      database.transaction(function(transactie) {
          transactie.executeSql(query, [], function(transactie, resultaten) {
              var klantenTabel = "<table><tr><th>Klant ID</th><th>Naam</th><th>Geboortedatum</th><th>Woonplaats</th><th>Straat</th><th>Nummer</th><th>Postcode</th><th>E-mail</th></tr>";
              for (var i = 0; i < resultaten.rows.length; i++) {
                  var klantID = resultaten.rows.item(i)["KlantID"];
                  var klantNaam = resultaten.rows.item(i)["KlantNaam"];
                  var geboorteDatum = resultaten.rows.item(i)["GeboorteDatum"];
                  var woonplaats = resultaten.rows.item(i)["Woonplaats"];
                  var straatNaam = resultaten.rows.item(i)["StraatNaam"];
                  var straatNummer = resultaten.rows.item(i)["StraatNummer"];
                  var postcode = resultaten.rows.item(i)["Postcode"];
                  var emailAdres = resultaten.rows.item(i)["EmailAdres"];
                  
                  klantenTabel += "<tr><td>" + klantID + "</td><td>" + klantNaam + "</td><td>" + geboorteDatum + "</td><td>" + woonplaats + "</td><td>" + straatNaam + "</td><td>" + straatNummer + "</td><td>" + postcode + "</td><td>" + emailAdres + "</td></tr>";
              }
              klantenTabel += "</table>";
  
              // Plaats de tabel op de pagina, bijvoorbeeld in een HTML-element met een bepaalde ID
              document.getElementById("Klanten").innerHTML = klantenTabel;
          });
      });
  }
  

  // Functie om een query uit te voeren op de database
  function uitvoerenQuery(query, variabelen) {
      database.transaction(function(transactie) {
          transactie.executeSql(query, variabelen);
          // updateStatus(query + "<br>");
      });
  }

  // Roep de functie aan om de tabellen aan te maken
  maakTabellen();


  if(document.body.id === "managerpage"){

      // Voeg event listeners toe aan de knoppen op de managers pagina
      document.getElementById("verwijderBestellingButton").addEventListener("click", verwijderBestelling);
      document.getElementById("verwijderAlleBestellingenButton").addEventListener("click", verwijderAlleBestellingen);
      
      document.getElementById("verwijderAlleKlanten").addEventListener("click", verwijderAlleKlanten);
      document.getElementById("voegArtikelToe").addEventListener("click", voegArtikelToe);
      document.getElementById("voegMedewerkerToe").addEventListener("click", voegMedewerkerToe);
      viewKlanten()
      toonBestelregels()
  }
  document.getElementById("AddCustomer").addEventListener("click", AddCustomer);

  if(document.body.id === "homepage"){
      let shoppingCart = [];

      // Zoek alle knoppen met de class "add-to-cart"
      const addToCartButtons = document.querySelectorAll(".add-to-cart");

      // Voeg een event listener toe aan elk van deze knoppen
      addToCartButtons.forEach(button => {
          button.addEventListener("click", addToCart);
      });

      // Select all order buttons with the class "bestelknop"
      const orderButtons = document.querySelectorAll(".bestelknop");

      // Add click event listeners to order buttons
      orderButtons.forEach(button => {
          button.addEventListener("click", addToCart);
      });

      // Function to add an item to the shopping cart
      function addToCart(event) {
          const productName = event.target.getAttribute("data-product");
          const productPrice = parseFloat(event.target.getAttribute("data-price"));

          afrekenen = true

          // Create a new item object
          const newItem = {
              name: productName,
              price: productPrice,
              quantity: 1 // Initial quantity is 1
          };

          // Check if the item is already in the cart
          const existingItemIndex = shoppingCart.findIndex(item => item.name === productName);

          if (existingItemIndex !== -1) {
              // If the item already exists, increase its quantity
              shoppingCart[existingItemIndex].quantity++;
          } else {
              // If the item is not in the cart, add it
              shoppingCart.push(newItem);
          }

          // Update the shopping cart display
          displayCart();
      }

      // Function to update the shopping cart display
      function displayCart() {
      const cartItems = document.getElementById("cart-items");
      const cartTotal = document.getElementById("cart-total");

      // Clear the current cart display
      cartItems.innerHTML = "";

      // Calculate and display the total price
      let total = 0;

      // Loop through the items in the cart
      shoppingCart.forEach(item => {
          total += item.price * item.quantity;

          // Create a list item for each item in the cart
          const listItem = document.createElement("li");
          listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
          cartItems.appendChild(listItem);
      });

      // Update the total price display
      cartTotal.textContent = `$${total.toFixed(2)}`;
      }
      
      //functie om de winkelwagen leeg te maken
      const clearCartButton = document.querySelector(".clear-cart");

      clearCartButton.addEventListener("click", clearCart);

          function clearCart() {
              // Leeg de array met winkelwagenitems
              shoppingCart = [];
          
              // Wis de inhoud van de cartItems div om de winkelwagen opnieuw weer te geven zonder items
              let cartItems = document.getElementById("cart-items");
              cartItems.innerHTML = "Uw winkelwagen is op dit moment leeg.";
              updateCartTotal()
              afrekenen = false
          }
          function updateCartTotal() {
              // Bereken hier de nieuwe totaalprijs (in jouw geval is deze altijd nul omdat de winkelwagen wordt leeggemaakt)
              const newTotal = 0;
          
              // Selecteer de cartTotal-div
              const cartTotal = document.getElementById("cart-total");
          
              // Update de inhoud van de div met de nieuwe totaalprijs
              cartTotal.textContent = `Totaal: €${newTotal.toFixed(2)}`;
          }
          updateCartTotal()



          function VoegBestelregelsToe(laatsteBestellingID) {
              shoppingCart.forEach(item => {
                  var productName = item.name;
                  var productPrice = item.price * item.quantity;
                  var productQuantity = item.quantity;
          
                  var laatsteArtikelIDQuery = "SELECT ArtikelID FROM ARTIKELEN WHERE ArtikelOmschrijving = ?";
                  var artikelVariabelen = [productName];
          
                  database.transaction(function(transactie) {
                      transactie.executeSql(laatsteArtikelIDQuery, artikelVariabelen, function(transactie, resultaat) {
                          if (resultaat.rows.length > 0) {
                              var laatsteArtikelID = resultaat.rows.item(0).ArtikelID;
          
                              var query = "INSERT INTO BESTELREGELS (Bestelnummer, ArtikelID, Aantal, Prijs, MedewerkerID) " +
                                  "VALUES (?, ?, ?, ?, ?)";
                              var bestelregelVariabelen = [laatsteBestellingID, laatsteArtikelID, productQuantity, productPrice, Math.floor(Math.random() * 5) + 1];
                              uitvoerenQuery(query, bestelregelVariabelen);

                              
          
                              
                          } else {
                              alert("Fout bij ophalen laatste ArtikelID.<br>");
                          }
                      });
                  });

              });
              alert('Betaling was succesvol!')
              clearCart()
          }
      }
});