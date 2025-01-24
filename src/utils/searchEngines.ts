import weiboIcon from "../assets/weibo.png";
import doubanIcon from "../assets/douban.png";
import githubIcon from "../assets/github.png";
import bilibiliIcon from "../assets/bilibili.png";
import youtubeIcon from "../assets/youtube.png";
import twitterIcon from "../assets/twitter.png";
//import wikiIcon from "../assets/wikipedia.png";


interface SearchEngine {
  name: string;
  getSearchUrl: (query: string) => string;
  iconUrl: unknown;
}

export const SearchEngines: Record<string, SearchEngine> = {
  weibo: {
    name: "Weibo",
    getSearchUrl: (query: string) =>
      `https://s.weibo.com/weibo/${encodeURIComponent(query)}`,
    iconUrl: weiboIcon,
  },
  douban: {
    name: "Douban",
    getSearchUrl: (query: string) =>
      `https://www.douban.com/search?q=${encodeURIComponent(query)}`,
    iconUrl: doubanIcon,
  },
  bilibili: {
    name: "Bilibili",
    getSearchUrl: (query: string) =>
      `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}`,
    iconUrl: bilibiliIcon,
  },
  github: {
    name: "GitHub",
    getSearchUrl: (query: string) =>
      `https://github.com/search?q=${encodeURIComponent(query)}`,
    iconUrl: githubIcon,
  },
  youtube: {
    name: "Youtube",
    getSearchUrl: (query: string): string => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
    iconUrl: youtubeIcon
  },
  twitter: {
    name: "Twitter",
    getSearchUrl: (query: string): string => `https://twitter.com/search?q=${encodeURIComponent(query)}`,
    iconUrl: twitterIcon
  },
  // wikipedia: {
  //   name: 'Wikipedia',
  //   getSearchUrl: (query: string) =>
  //       `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`,
  //   iconUrl: wikiIcon
  // }
};
