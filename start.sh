# removed shebang
if [ ! -d "public/product-images" ]; then
  mkdir -p public/product-images
fi
nodemon --env-file=.env src/app.mjs
