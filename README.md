# Morningtrain Standard Theme

Choose a namespace for the project and a domain. PHP namespace should reflect the project. The textdomain or js
namespace should match. For Jira projects use the short string prefix. Set these in style.css and composer.json

Rename theme and set settings in style.css!

# Getting started

To quickly setup your theme namespace and text-domain use the two following snippets. Replace `StdThemeNamespace` with your own namespace and `std-theme` and with your text domain.
`find ./hooks ./app ./routes ./resources/views ./resources/blocks ./functions.php ./style.css ./composer.json \( -name "*.php" -o -name "composer.json" -o -name "style.css" -o -name "block.json" \) -exec sed -i "s/StdThemeNamespace/MA/g" {} \;`

`find ./hooks ./app ./routes ./resources/views ./resources/blocks ./functions.php ./style.css ./composer.json \( -name "*.php" -o -name "composer.json" -o -name "style.css" -o -name "block.json" \) -exec sed -i "s/std-theme/MA/g" {} \;`

`npm i && npm run prod`

`composer update`
