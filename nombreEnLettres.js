

//----------------------func


function nombreEnLettres(nombre) {
  const unite = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
  const dizaine = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante"];
  const dizaine10_19 = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];

  function convertMoinsDeMille(n) {
    let result = "";
    const centaines = Math.floor(n / 100);
    const reste = n % 100;

    if (centaines > 0) {
      result += unite[centaines] + " cent";
      if (reste === 0 && centaines > 1) result += "s";
      if (reste > 0) result += " ";
    }

    if (reste < 10) {
      result += (reste > 0 || n === 0) ? unite[reste] : "";
    } else if (reste < 20) {
      result += dizaine10_19[reste - 10];
    } else {
      const d = Math.floor(reste / 10);
      const u = reste % 10;
      if (d === 7) {
        result += "soixante-" + (u > 0 ? dizaine10_19[u] : "dix");
      } else if (d === 9) {
        result += "quatre-vingt-" + (u > 0 ? dizaine10_19[u] : "dix");
      } else {
        result += dizaine[d];
        if (u === 1 && d !== 1) {
          result += " et un";
        } else if (u > 0) {
          result += "-" + unite[u];
        }
      }
    }

    return result.trim();
  }

  function convertEntier(n) {
    if (n === 0) return "zéro";
    let mots = "";
    const milliards = Math.floor(n / 1_000_000_000);
    const millions = Math.floor((n % 1_000_000_000) / 1_000_000);
    const milliers = Math.floor((n % 1_000_000) / 1000);
    const reste = n % 1000;

    if (milliards > 0) mots += convertMoinsDeMille(milliards) + " milliard" + (milliards > 1 ? "s " : " ");
    if (millions > 0) mots += convertMoinsDeMille(millions) + " million" + (millions > 1 ? "s " : " ");
    if (milliers > 0) mots += (milliers === 1 ? "mille " : convertMoinsDeMille(milliers) + " mille ");
    if (reste > 0) mots += convertMoinsDeMille(reste);

    return mots.trim();
  }

  if (typeof nombre === "string") nombre = parseFloat(nombre.replace(",", "."));

  const [entierStr, decimalStr] = nombre.toString().split(".");
  const entier = parseInt(entierStr, 10);
  const partieEntiere = convertEntier(entier);

  let resultat = partieEntiere;
  if (decimalStr) {
    const decimalNombre = parseInt(decimalStr, 10);
    if (decimalStr.startsWith("0") && decimalStr.length > 1) {
      const chiffres = decimalStr.split("").map(c => unite[parseInt(c)]);
      resultat += " virgule " + chiffres.join(" ");
    } else {
      resultat += " virgule " + convertMoinsDeMille(decimalNombre);
    }
    resultat += " Centimes";
  }

  return resultat;
}

console.log(nombreEnLettres(1500.05));         // "mille cinq cents virgule cinq"
console.log(nombreEnLettres("123456,08"));    // "cent vingt-trois mille quatre cent cinquante-six virgule sept huit"
console.log(nombreEnLettres(1000000));


