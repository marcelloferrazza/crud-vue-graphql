
export function translateType(type) {
    const translations = {
      all: "Todos",
      adventure: "Aventura",
      animation: "Animação",
      drama: "Drama",
      documentary: "Documentário",
      musical: "Musical",
      mystery: "Suspense",
      romance: "Romance",
      war: "Guerra",
      western: "Faroeste",
      comedy: "Comédia",
      action: "Ação",
      fiction: "Ficção",
      horror: "Terror",
    };
    return translations[type] || "Unknow";
  }
  