export function translateType(type) {
    const translations = {
      all: "Todos",
      comedy: "Comédia",
      action: "Ação",
      fiction: "Ficção",
      horror: "Terror",
    };
    return translations[type] || "Unknow";
  }
  