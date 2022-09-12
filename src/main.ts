import axios from "axios";

import "./style.css";

const URL = "https://api.thecatapi.com/v1/images/search";
const catImage = document.querySelector<HTMLImageElement>("#cat-image");
const catLoader = document.querySelector("#cat-loader");

type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

const apiGet = <T>(url: string): Promise<T> =>
  axios.get(url).then((res) => res.data);

const getRandomCat = async (): Promise<Cat> => {
  const response = await apiGet<Cat[]>(URL);
  return response[0];
};

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => {
      resolve();
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = src;
  });

const startLoading = () => {
  catImage?.classList?.toggle?.("hidden", true);
  catLoader?.classList?.toggle?.("hidden", false);
};

const stopLoading = () => {
  catImage?.classList?.toggle?.("hidden", false);
  catLoader?.classList?.toggle?.("hidden", true);
};

const showRandomCat = async (): Promise<void> => {
  startLoading();

  const { url } = await getRandomCat();

  await preloadImage(url);

  if (catImage !== null) {
    catImage.src = url;
  }

  stopLoading();
};

window.onload = showRandomCat;

if (catImage !== null) {
  catImage.onclick = showRandomCat;
}
