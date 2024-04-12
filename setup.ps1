# Verifica se o Node.js está instalado
if (-not (Test-Path "C:\Program Files\nodejs\node.exe")) {
    # Baixa e instala o Node.js
    Invoke-WebRequest -Uri "https://nodejs.org/dist/latest/node-v20.0.0-x64.msi" -OutFile "$env:TEMP\node_installer.msi"
    Start-Process -Wait -FilePath msiexec -ArgumentList "/i", "$env:TEMP\node_installer.msi", "/quiet"
}

# Executa o npm install
cmd /c npm i

# Executa o npm run dev
cmd /c npm run dev