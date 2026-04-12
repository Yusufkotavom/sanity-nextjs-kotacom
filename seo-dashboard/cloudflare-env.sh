#!/bin/bash

# Script untuk upload environment variables ke Cloudflare Pages
# Usage: ./cloudflare-env.sh <project-name>

PROJECT_NAME="${1:-seo-dashboard-kotacom}"

echo "🚀 Uploading environment variables to Cloudflare Pages: $PROJECT_NAME"
echo ""

# Load dari .env.local
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local tidak ditemukan"
    exit 1
fi

# Function untuk add env var
add_env() {
    local key=$1
    local value=$2
    echo "Adding: $key"
    npx wrangler pages secret put "$key" --project-name="$PROJECT_NAME" <<< "$value"
}

# Parse .env.local dan upload
while IFS='=' read -r key value; do
    # Skip comments dan empty lines
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # Remove quotes dari value
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    
    # Skip jika value kosong atau placeholder
    [[ -z "$value" ]] && continue
    [[ "$value" =~ ^replace-with.*$ ]] && continue
    [[ "$value" =~ ^TODO.*$ ]] && continue
    
    # Upload ke Cloudflare
    add_env "$key" "$value"
    
done < .env.local

echo ""
echo "✅ Selesai! Environment variables berhasil di-upload ke $PROJECT_NAME"
echo ""
echo "Verifikasi di: https://dash.cloudflare.com"
echo "Workers & Pages > $PROJECT_NAME > Settings > Environment variables"
