echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build 

echo "Deploying files to server..."
scp -r build/* user@10.100.2.63:/var/www/html/10.100.2.63/

echo "Done!"