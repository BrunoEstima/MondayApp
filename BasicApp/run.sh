
echo "[+] Building docker image..."
# Build docker image
docker build -t basic_node_app .

echo "[+] Starting the container..."
# run docker image and begin to listen on localhost port 3000
docker run -p 3000:80 --name basic_node_app -d basic_node_app 

echo "[+] Checking if ngrok is installed..."
# Check if nkgron is already installed or intall it
FILE=./ngrok/ngrok
if [ ! -f "$FILE" ]; then
    echo "[+] Ngrok not installed. Installing..."
    echo "[+] Downloading ngrok..."
    # Download ngrok 
    wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-darwin-amd64.zip

    echo "[+] Creating ngrok folder..."
    # Create a folder for ngrok to be unziped
    mkdir ./ngrok

    echo "[+] Unziping ngrok into folder..."
    # unzip ngrok
    unzip ./ngrok-stable-darwin-amd64.zip -d ./ngrok

    echo "[+] Removing .zip file..."
    # Delete ngrok zip file
    rm ./*.zip

    echo "[+] Adding execute permission to ngrok..."
    # Add execute permission to ngrok
    chmod +x ./ngrok/ngrok
else
    echo "[+] Ngrok already installed. Skipping..."
fi

echo "[+] Starting ngrok..."
# Start ngrok to tunnel on port 3000
./ngrok/ngrok http 3000


function cleanup {
    echo "[x] Cleaning up for closing..."
    echo "[x] Stoping docker container..."
    docker stop basic_node_app
    echo "[x] Removing docker container..."
    docker rm basic_node_app
    echo "[x] Cleanup done..."
    echo "[x] Bye!"
}

trap cleanup EXIT