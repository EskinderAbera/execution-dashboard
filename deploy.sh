echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build 

echo "Deploying files to server..."
scp -r build/* test@10.1.125.87:/var/www/10.1.125.87/

echo "Done!"