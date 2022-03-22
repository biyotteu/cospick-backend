import fs from 'fs';
import axios from 'axios';

export const getMap = async (ctx, next) => {
  console.log(__dirname + '/index.html');
  const rawContent = fs
    .readFileSync(__dirname + '/index.html')
    .toString('utf-8');
  ctx.body = rawContent;
};

export const search = async (ctx, next) => {
  const { keyword } = ctx.query;
  const headers = {
    Authorization: 'KakaoAK e29f627b9e9dc99381e0b7cd359c1605',
  };
  axios
    .get(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}`,
      { headers },
    )
    .then((res) => console.log(res.body, res.documents));

  console.log(keyword);
};
