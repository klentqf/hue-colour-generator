export interface ColourFamily {
  name: string;
  preview: string[];
  variations: ColourVariation[];
}

export interface ColourVariation {
  name: string;
  hex: string;
  label: string;
}

export const colourFamilies: ColourFamily[] = [
  {
    name: "pink",
    preview: ["#FFB3C6", "#F4A0A0", "#E8B4CB"],
    variations: [
      { name: "baby pink", hex: "#FFD6E0", label: "baby pink" },
      { name: "pastel pink", hex: "#FFB3C6", label: "pastel pink" },
      { name: "dusty pink", hex: "#D4A0A0", label: "dusty pink" },
      { name: "rose pink", hex: "#E8A0B0", label: "rose pink" },
      { name: "mauve pink", hex: "#C8A0B4", label: "mauve pink" },
      { name: "hot pink", hex: "#FF69B4", label: "hot pink" },
      { name: "dark pink", hex: "#C2607A", label: "dark pink" },
    ],
  },
  {
    name: "blue",
    preview: ["#A8C8E8", "#B0D0F0", "#90B4D8"],
    variations: [
      { name: "powder blue", hex: "#B0D4E8", label: "powder blue" },
      { name: "baby blue", hex: "#CCE5F0", label: "baby blue" },
      { name: "sky blue", hex: "#87CEEB", label: "sky blue" },
      { name: "periwinkle", hex: "#CCCCFF", label: "periwinkle" },
      { name: "slate blue", hex: "#7B8FC8", label: "slate blue" },
      { name: "navy blue", hex: "#1F3B6E", label: "navy blue" },
      { name: "dusty blue", hex: "#8EB4C8", label: "dusty blue" },
    ],
  },
  {
    name: "green",
    preview: ["#B8D4B8", "#A8C4A0", "#C8D8C0"],
    variations: [
      { name: "sage green", hex: "#B2C8A8", label: "sage green" },
      { name: "mint green", hex: "#AADECC", label: "mint green" },
      { name: "olive green", hex: "#8C9E60", label: "olive green" },
      { name: "forest green", hex: "#2D6A4F", label: "forest green" },
      { name: "lime green", hex: "#AADC44", label: "lime green" },
      { name: "pastel green", hex: "#CCEECC", label: "pastel green" },
      { name: "moss green", hex: "#7A9068", label: "moss green" },
    ],
  },
  {
    name: "yellow",
    preview: ["#F5E4A8", "#FFE080", "#F0D880"],
    variations: [
      { name: "butter yellow", hex: "#F5EDCA", label: "butter yellow" },
      { name: "pastel yellow", hex: "#FFF4A0", label: "pastel yellow" },
      { name: "golden yellow", hex: "#F0C040", label: "golden yellow" },
      { name: "lemon yellow", hex: "#FFF44F", label: "lemon yellow" },
      { name: "champagne", hex: "#F7E7CE", label: "champagne" },
      { name: "mustard", hex: "#D4A017", label: "mustard" },
      { name: "warm cream", hex: "#FFF8DC", label: "warm cream" },
    ],
  },
  {
    name: "purple",
    preview: ["#D4C0E8", "#C0A8E0", "#E0D4F0"],
    variations: [
      { name: "lavender", hex: "#E6D8F0", label: "lavender" },
      { name: "lilac", hex: "#C8A8D4", label: "lilac" },
      { name: "mauve", hex: "#B096B4", label: "mauve" },
      { name: "violet", hex: "#9400D3", label: "violet" },
      { name: "dusty purple", hex: "#9B8FA8", label: "dusty purple" },
      { name: "plum", hex: "#8E4585", label: "plum" },
      { name: "wisteria", hex: "#C9A0DC", label: "wisteria" },
    ],
  },
  {
    name: "red",
    preview: ["#F08080", "#E07070", "#F4A0A0"],
    variations: [
      { name: "blush red", hex: "#F4A0A0", label: "blush red" },
      { name: "rose red", hex: "#E07070", label: "rose red" },
      { name: "tomato red", hex: "#FF6347", label: "tomato red" },
      { name: "crimson", hex: "#DC143C", label: "crimson" },
      { name: "terracotta", hex: "#C0705A", label: "terracotta" },
      { name: "brick red", hex: "#9B4444", label: "brick red" },
      { name: "wine red", hex: "#722F37", label: "wine red" },
    ],
  },
  {
    name: "orange",
    preview: ["#F4B880", "#F0A870", "#F8C890"],
    variations: [
      { name: "peach", hex: "#FFCBA4", label: "peach" },
      { name: "apricot", hex: "#FBCEB1", label: "apricot" },
      { name: "warm orange", hex: "#F4A460", label: "warm orange" },
      { name: "tangerine", hex: "#F28500", label: "tangerine" },
      { name: "burnt orange", hex: "#CC5500", label: "burnt orange" },
      { name: "coral", hex: "#FF7F50", label: "coral" },
      { name: "muted peach", hex: "#D4A080", label: "muted peach" },
    ],
  },
  {
    name: "brown",
    preview: ["#C8A87C", "#B4906C", "#D4B890"],
    variations: [
      { name: "warm beige", hex: "#F0DFC0", label: "warm beige" },
      { name: "sand", hex: "#C4A87C", label: "sand" },
      { name: "caramel", hex: "#A06040", label: "caramel" },
      { name: "chocolate", hex: "#7B3F00", label: "chocolate" },
      { name: "mocha", hex: "#6F4E37", label: "mocha" },
      { name: "latte", hex: "#B89070", label: "latte" },
      { name: "taupe", hex: "#9E9080", label: "taupe" },
    ],
  },
  {
    name: "grey",
    preview: ["#C8C8C8", "#B4B4B4", "#D4D4D4"],
    variations: [
      { name: "silver grey", hex: "#C0C0C0", label: "silver grey" },
      { name: "light grey", hex: "#D8D8D8", label: "light grey" },
      { name: "warm grey", hex: "#B4ACA8", label: "warm grey" },
      { name: "cool grey", hex: "#A8B0B8", label: "cool grey" },
      { name: "slate grey", hex: "#708090", label: "slate grey" },
      { name: "charcoal", hex: "#505050", label: "charcoal" },
      { name: "mist grey", hex: "#E8E8E8", label: "mist grey" },
    ],
  },
  {
    name: "black",
    preview: ["#2C2C2C", "#404040", "#1A1A1A"],
    variations: [
      { name: "soft black", hex: "#2C2C2C", label: "soft black" },
      { name: "warm black", hex: "#1C1814", label: "warm black" },
      { name: "cool black", hex: "#14181C", label: "cool black" },
      { name: "jet black", hex: "#0A0A0A", label: "jet black" },
      { name: "rich black", hex: "#0A0808", label: "rich black" },
      { name: "near black", hex: "#202020", label: "near black" },
    ],
  },
  {
    name: "white",
    preview: ["#FAFAFA", "#FFF8F4", "#F8F8F8"],
    variations: [
      { name: "pure white", hex: "#FFFFFF", label: "pure white" },
      { name: "off white", hex: "#FAF9F6", label: "off white" },
      { name: "warm white", hex: "#FFF8F0", label: "warm white" },
      { name: "cool white", hex: "#F4F8FC", label: "cool white" },
      { name: "cream white", hex: "#FFFDD0", label: "cream white" },
      { name: "ivory", hex: "#FFFFF0", label: "ivory" },
      { name: "linen", hex: "#FAF0E6", label: "linen" },
    ],
  },
  {
    name: "neutral",
    preview: ["#E8E0D8", "#D8D0C8", "#F0E8E0"],
    variations: [
      { name: "warm nude", hex: "#E8D5C4", label: "warm nude" },
      { name: "cool nude", hex: "#DDD5D0", label: "cool nude" },
      { name: "greige", hex: "#C8B8A8", label: "greige" },
      { name: "parchment", hex: "#F1E9D8", label: "parchment" },
      { name: "linen neutral", hex: "#EDE0D0", label: "linen" },
      { name: "stone", hex: "#B0A898", label: "stone" },
      { name: "ecru", hex: "#C2B280", label: "ecru" },
    ],
  },
];
