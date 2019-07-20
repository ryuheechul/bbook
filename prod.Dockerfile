FROM local-dockerfile-bbook:node-base

COPY ./package.json /bbook-app/
COPY ./yarn.lock /bbook-app/

RUN yarn

COPY . /bbook-app

CMD ["yarn", "serve"]
