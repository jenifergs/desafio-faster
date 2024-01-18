import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function seeder() {
  await prisma.drink_categories.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Coquetéis', id: 1 },
      { name: 'Cervejas Industrializadas', id: 2 },
      { name: 'Cervejas Artesanais', id: 3 },
      { name: 'Vinhos', id: 4 },
    ],
  });

  await prisma.drinks.createMany({
    data: [
      {
        name: 'Château Margaux',
        description:
          'Um renomado vinho tinto da região de Bordeaux, na França conhecido por sua elegância, complexidade e longevidade. Geralmente, é feito principalmente com uvas Cabernet Sauvignon',
        image: 'assets/Vinho-Chateau-Marguax.png',
        price: 300,
        category_id: 4,
        id: 1,
      },
      {
        name: 'Sassicaia',
        description:
          'Originário da região da Toscana, na Itália, Sassicaia é um vinho tinto icônico feito principalmente com uvas Cabernet Sauvignon. É conhecido por sua estrutura robusta, taninos firmes e notas de frutas escuras.',
        image: 'assets/Vinho-Sassicaia.png',
        price: 250,
        category_id: 4,
        id: 2,
      },
      {
        name: 'Domaine Leflaive Montrachet',
        description:
          'Este é um vinho branco da Borgonha, França, produzido pela Domaine Leflaive. Montrachet é uma das denominações mais prestigiadas da região para vinhos brancos, geralmente feito com a uva Chardonnay. Espera-se que seja complexo, com notas de frutas brancas e acidez equilibrada.',
        image: 'assets/Vinho-Domaines.png',
        price: 400,
        category_id: 4,
        id: 3,
      },
      {
        name: 'Château Smith Haut Lafitte Blanc',
        description:
          'Um vinho branco da região de Bordeaux, Château Smith Haut Lafitte Blanc é conhecido por sua elegância e frescor. Geralmente feito com uma mistura de Sauvignon Blanc e Sémillon, apresenta notas cítricas, florais e minerais.',
        image: 'assets/Vinho-Smith-Haut-Laffite.png',
        price: 250,
        category_id: 4,
        id: 4,
      },
      {
        name: "Château d'Esclans Garrus Rosé",
        description:
          "Rosé da região da Provence, Château d'Esclans Garrus é conhecido por ser um dos rosés mais premium do mundo. É elaborado com cuidado e é apreciado por sua complexidade, estrutura e finesse.",
        image: 'assets/Vinho-Chateau-Garrus.png',
        price: 300,
        category_id: 4,
        id: 5,
      },
      {
        name: 'Porto Vintage',
        description:
          'Um vinho fortificado originário da região do Porto, em Portugal. Porto Vintage é produzido em anos excepcionais e é caracterizado por ser encorpado, frutado e ter grande potencial de envelhecimento.',
        image: 'assets/Vinho-Porto-Vintage.png',
        price: 250,
        category_id: 4,
        id: 6,
      },
      {
        name: 'Sherry Pedro Ximénez',
        description:
          'Um estilo de vinho fortificado da região da Andaluzia, na Espanha. O Pedro Ximénez é um tipo de uva utilizada na produção de alguns Sherries, resultando em vinhos doces e intensos, com notas de passas, figos e especiarias.',
        image: 'assets/Vinho-Pedro-Ximenez.png',
        price: 200,
        category_id: 4,
        id: 7,
      },
      {
        name: 'Gravner Anfora Ribolla Gialla',
        description:
          'Um vinho laranja da região da Friuli-Venezia Giulia, na Itália. Este vinho, produzido por Gravner, é fermentado em ânforas de barro, resultando em um vinho complexo, com taninos e sabores único',
        image: 'assets/Vinho-Gravner.png',
        price: 350,
        category_id: 4,
        id: 8,
      },
      {
        name: 'Radikon Oslavje',
        description:
          'Outro vinho laranja da região de Friuli, Itália. Radikon Oslavje é produzido por Radikon e é conhecido por sua abordagem de vinificação natural e maceração prolongada, resultando em um vinho de cor laranja, com aromas intensos e uma estrutura robusta.',
        image: 'assets/Vinho-Radikon.png',
        price: 400,
        category_id: 4,
        id: 9,
      },
      {
        name: 'Vinho Vale do São Francisco',
        description:
          'Vinho  tinto tropicais do Vale do São Francisco são, na sua maioria, jovens, frescos, aromáticos, frutados e florais.',
        image: 'assets/Vinho-Vale-Sao-Francisco.png',
        price: 75,
        category_id: 4,
        id: 10,
      },
      // cervejas industrializadas
      {
        name: 'Eisenbahn Pilsen',
        description: 'Uma cerveja pilsen com sabor maltado e amargor moderado',
        image: 'assets/comum-wernesgruner.png',
        price: 10,
        category_id: 2,
        id: 11,
      },
      {
        name: 'Colorado Appia',
        description: 'Uma cerveja de trigo com mel, refrescante e suave',
        image: 'assets/comum-colorado-appia.png',
        price: 12,
        category_id: 2,
        id: 12,
      },
      {
        name: 'Cerveja Colorado Indica',
        description:
          'Uma cerveja forte e amarga, com notas de frutas cítricas e pinho',
        image: 'assets/comum-colorado-indica.png',
        price: 15,
        category_id: 2,
        id: 13,
      },
      {
        name: 'Cerveja Petra Aurum',
        description: 'Uma cerveja pilsen com sabor suave e refrescante',
        image: 'assets/comum-cerveja-petra-aurum.png',
        price: 10,
        category_id: 2,
        id: 14,
      },
      {
        name: 'Cerveja Praya Witbier',
        description: 'Uma cerveja de trigo com aroma de laranja e coentro',
        image: 'assets/comum-praya-witbier.png',
        price: 12,
        category_id: 2,
        id: 15,
      },
      {
        name: 'Brahma Chopp',
        description:
          'Uma cerveja do tipo lager com aroma mais suave e discreto',
        image: 'assets/comum-brama-shoop.png',
        price: 8,
        category_id: 2,
        id: 16,
      },
      {
        name: 'Cerveja Crystal',
        description: 'Uma cerveja leve e refrescante',
        image: 'assets/comum-crystal.png',
        price: 6,
        category_id: 2,
        id: 17,
      },
      {
        name: 'Cerveja Skol',
        description: 'Uma cerveja pilsen com sabor suave e refrescante',
        image: 'assets/comum-Skol.png',
        price: 6,
        category_id: 2,
        id: 18,
      },
      {
        name: 'Cerveja Antarctica Original',
        description: 'Uma cerveja pilsen com sabor maltado e amargor moderado',
        image: 'assets/comum-Original.png',
        price: 8,
        category_id: 2,
        id: 19,
      },
      {
        name: 'Heineken',
        description: 'Uma cerveja Pilsen refrescante e amarga',
        image: 'assets/comum-Heineken.png',
        price: 9,
        category_id: 2,
        id: 20,
      },
      // cervejas artesanais
      {
        name: 'Westvleteren 12',
        description:
          'A Westvleteren 12 é uma cerveja trapista belga escura e forte, com um sabor complexo e frutado. É considerada uma das melhores cervejas do mundo',
        image: 'assets/artesanal-WestvleterenBrewery.png',
        price: 100,
        category_id: 3,
        id: 21,
      },
      {
        name: 'Heady Topper',
        description:
          'A Heady Topper é uma cerveja americana do estilo New England IPA, com um sabor intenso e frutado. É considerada uma das melhores cervejas do mundo',
        image: 'assets/artesanal-TheAlchemist.png',
        price: 20,
        category_id: 3,
        id: 22,
      },
      {
        name: 'Stone IPA',
        description:
          'A Stone IPA é uma cerveja americana do estilo American IPA, com um sabor forte e amargo. É uma das cervejas mais populares da Stone Brewing',
        image: 'assets/artesanal-StoneBrewing.png',
        price: 15,
        category_id: 3,
        id: 23,
      },
      {
        name: 'Sierra Nevada Pale Ale',
        description:
          'A Sierra Nevada Pale Ale é uma cerveja americana do estilo American Pale Ale, com um sabor equilibrado e refrescante. É uma das cervejas mais populares da Sierra Nevada Brewing Co',
        image: 'assets/artesanal-SierraNevadaBrewingCo.png',
        price: 10,
        category_id: 3,
        id: 24,
      },
      {
        name: 'Pliny the Elder',
        description:
          'A Pliny the Elder é uma cerveja americana do estilo Double IPA, com um sabor forte e amargo. É considerada uma das melhores cervejas do mundo',
        image: 'assets/artesanal-RussianRiverBrewingCompany.png',
        price: 25,
        category_id: 3,
        id: 25,
      },
      {
        name: 'Dale’s Pale Ale',
        description:
          'A Dale’s Pale Ale é uma cerveja americana do estilo American Pale Ale, com um sabor forte e amargo. É uma das cervejas mais populares da Oskar Blues Brewery',
        image: 'assets/artesanal-OskarBluesBrewery.png',
        price: 12,
        category_id: 3,
        id: 26,
      },
      {
        name: 'Beer Geek Breakfast',
        description:
          'A Beer Geek Breakfast é uma cerveja dinamarquesa do estilo Imperial Stout, com um sabor forte e complexo. É uma das cervejas mais populares da Mikkeller',
        image: 'assets/artesanal-Mikkeller.png',
        price: 30,
        category_id: 3,
        id: 27,
      },
      {
        name: 'Kentucky Breakfast Stout',
        description:
          'A Kentucky Breakfast Stout é uma cerveja americana do estilo Imperial Stout, com um sabor forte e complexo. É uma das cervejas mais populares da Founders Brewing Co',
        image: 'assets/artesanal-FoundersBrewingCo.png',
        price: 18,
        category_id: 3,
        id: 28,
      },
      {
        name: '90 Minute IPA',
        description:
          'A 90 Minute IPA é uma cerveja americana do estilo Imperial IPA, com um sabor forte e amargo. É uma das cervejas mais populares da Dogfish Head Craft Brewery',
        image: 'assets/artesanal-DogfishHeadCraftBrewery.png',
        price: 18,
        category_id: 3,
        id: 29,
      },
      {
        name: 'Gueuze 100% Lambic Bio',
        description:
          'A Gueuze 100% Lambic Bio é uma cerveja belga do estilo Gueuze, com um sabor ácido e frutado. É uma das cervejas mais populares da Cantillon Brewery',
        image: 'assets/artesanal-CantillonBrewery.png',
        price: 50,
        category_id: 3,
        id: 30,
      },

      // coquetéis
      {
        name: 'Martini',
        description:
          'O Martini é um coquetel clássico que pode ser feito com gin ou vodka e vermute. É geralmente servido com uma azeitona ou uma casca de limão',
        image: 'assets/Cocktail-Martini.png',
        price: 20,
        category_id: 1,
        id: 31,
      },
      {
        name: 'Margarita',
        description:
          'A Margarita é uma bebida mexicana feita com tequila, licor de laranja e suco de limão. É muitas vezes servida com uma borda de sal',
        image: 'assets/Cocktail-marguerita.png',
        price: 15,
        category_id: 1,
        id: 32,
      },
      {
        name: 'Mojito',
        description:
          'O Mojito é um coquetel cubano feito com rum, açúcar, suco de limão, água com gás e hortelã',
        image: 'assets/Cocktail-mojito.png',
        price: 12,
        category_id: 1,
        id: 33,
      },
      {
        name: 'Old Fashioned',
        description:
          'O Old Fashioned é um coquetel clássico feito com bourbon ou uísque, açúcar, angostura bitters e uma casca de laranja',
        image: 'assets/Cocktail-WhiskySour.png',
        price: 25,
        category_id: 1,
        id: 34,
      },
      {
        name: 'Negroni',
        description:
          'O Negroni é um coquetel italiano feito com gin, vermute tinto e Campari. É geralmente guarnecido com uma fatia de laranja',
        image: 'assets/Cocktail-Negroni.png',
        price: 30,
        category_id: 1,
        id: 35,
      },
      {
        name: 'Cosmopolitan',
        description:
          'O Cosmopolitan é um coquetel americano feito com vodka, licor de laranja, suco de cranberry e suco de limão',
        image: 'assets/Coktail-Cosmopolitano.png',
        price: 20,
        category_id: 1,
        id: 36,
      },
      {
        name: 'Piña Colada',
        description:
          'A Piña Colada é uma bebida tropical feita com rum, leite de coco e suco de abacaxi',
        image: 'assets/Cocktail-PinaCollada.png',
        price: 18,
        category_id: 1,
        id: 37,
      },
      {
        name: 'Bloody Mary',
        description:
          'Um coquetel americano feito com vodka, suco de tomate, Tabasco, suco de limão, sal, molho Worcestershire, aipo e limão',
        image: 'assets/Coktail-BloodyMary.png',
        price: 25,
        category_id: 1,
        id: 38,
      },
      {
        name: 'Caipirinha',
        description:
          'A Caipirinha é a bebida nacional do Brasil, feita com cachaça, açúcar e limã',
        image: 'assets/Coktail-Caipirinha.png',
        price: 8,
        category_id: 1,
        id: 39,
      },
      {
        name: 'Daiquiri',
        description:
          'O Daiquiri é um coquetel cubano feito com rum, suco de limão e xarope simples. É muitas vezes servido frozen',
        image: 'assets/Cocktail-Daiquiri.png',
        price: 18,
        category_id: 1,
        id: 40,
      },
    ],
    skipDuplicates: true,
  });
}

seeder();
