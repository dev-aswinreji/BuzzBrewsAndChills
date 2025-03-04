# removed shebang
#!/bin/bash
if [ ! -d "public/product-images" ]; then
  sudo mkdir -p public/product-images
fi
nodemon --env-file=.env src/app.mjs
