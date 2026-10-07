#!/bin/sh
# Downloads every image the homepage uses from the live WordPress uploads into public/media (originals, untouched).
# Re-run to refresh. Source: https://acopia.co.uk/wp-content/uploads/

U=https://acopia.co.uk/wp-content/uploads
D=public/media
mkdir -p $D/logos $D/brands
get() { [ -s "$2" ] || curl -sfL --retry 3 -o "$2" "$U/$1" || echo "MISSING $1"; }
# Hero, challenges, maturity index, processes (live homepage)
for f in 2025/07/Pains-Process-Improvement.webp 2025/07/Pains-Cost-Control.webp 2025/07/Pains-Supply-Chain-Resilience.webp \
  2025/07/Pains-Sustainability.webp 2026/03/Retail-Consumables-Maturity-Index.webp 2025/07/Process-Health-Check.webp \
  2025/07/Process-Backroom-Review.webp 2025/07/Process-MyAcopia-1.webp \
  2026/03/RCMI-Blog-Feature-Image.webp 2025/10/Single-Source-Procurement-webp.webp \
  2025/04/5-GNFR-Strategies-for-Better-Stock-Visibility.webp 2025/04/Your-guide-to-controlling-retail-procurement-costs.webp \
  2025/08/Acopia-Group.webp \
  2026/08/Busy-Store-webp.webp 2026/06/Shop-front-1536x1359.webp; do
  get "$f" "$D/$(basename "$f")"
done
# "Trusted by Leading Retailers" logo strip, in live homepage order
for n in Aldo Acorns Barnardos-Charity Cats-Protection Dobbies-Garden-Centre Helen-Douglas Oxfam ProCook Royal-Trinity-Hospice-1 Saltrock-Surfware Scamp-Dude; do
  get "2025/07/$n.webp" "$D/logos/$n.webp"
done
get 2026/03/Urban-Outfitters.webp $D/logos/Urban-Outfitters.webp
# Acopia's own product brands (Products mega menu)
get 2024/12/myacopia_logo_fullcol.svg $D/brands/myacopia.svg
get 2025/08/myacopia_logo_white.webp $D/brands/myacopia-white.webp
get 2024/12/everoll_logo-main.svg $D/brands/everoll.svg
get 2024/12/Velo-Logo_black-1.svg $D/brands/velo.svg
get 2024/12/Nest_Logo_black.svg $D/brands/nest.svg
get 2024/12/Miniml-Logo-black.svg $D/brands/miniml.svg
get 2024/12/iTack.png $D/brands/itack.png
get 2026/01/50-Years-Acopia_Lockup_Lnd-White.svg public/brand/50-years-white.svg
echo done
