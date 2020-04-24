const Blueprint = require("factorio-blueprint");

const all_the_inserters: string =
  "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";

const all_the_belts: string =
  "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";

const book_string: string = `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
`;

// try {
//   let blueprint_1 = new Blueprint(all_the_inserters);
//   let blueprint_2 = new Blueprint(all_the_belts);
//   let book = new Blueprint(book_string);
//
//   let blueprints: any[] = [all_the_inserters, all_the_belts, book_string];
//
//   let real_blueprints: any[] = [];
//   for (let i = 0; i < blueprints.length; i++) {
//     if (Blueprint.isBook(blueprints[i])) {
//       let book_blueprints = Blueprint.getBook(blueprints[i]);
//       for (let i = 0; i < book_blueprints.length; i++) {
//         real_blueprints.push(book_blueprints[i]);
//       }
//     } else {
//       real_blueprints.push(new Blueprint(blueprints[i]));
//     }
//   }
//
//   console.log(Blueprint.toBook(real_blueprints));
// } catch (error) {
//   console.log(error);
// }

console.log(Blueprint.toBook([]));
console.log("End of transmission. Don't panic!");
