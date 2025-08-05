#!/bin/bash

# Script to replace all emoji icons with Font Awesome icons in mobile sidebar

FILE="src/app/main/layout.tsx"

# Replace mobile sidebar icons
sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">🏢<\/span>/<FontAwesomeIcon icon="building" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">🔧<\/span>/<FontAwesomeIcon icon="wrench" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-orange-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">📦<\/span>/<FontAwesomeIcon icon="box" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">📋<\/span>/<FontAwesomeIcon icon="list" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-pink-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">🛤️<\/span>/<FontAwesomeIcon icon="route" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-gray-500" \/>/g' $FILE

sed -i 's/<span className="text-lg">📅<\/span>/<FontAwesomeIcon icon="calendar-alt" className="text-base text-blue-600" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">📝<\/span>/<FontAwesomeIcon icon="file-invoice" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-blue-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">📈<\/span>/<FontAwesomeIcon icon="chart-line" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">⚙️<\/span>/<FontAwesomeIcon icon="cog" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-yellow-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">🏭<\/span>/<FontAwesomeIcon icon="industry" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" \/>/g' $FILE

sed -i 's/<span className="text-lg">🚀<\/span>/<FontAwesomeIcon icon="rocket" className="text-base text-blue-600" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">🔨<\/span>/<FontAwesomeIcon icon="hammer" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-blue-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">🛒<\/span>/<FontAwesomeIcon icon="shopping-cart" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" \/>/g' $FILE

sed -i 's/<span className="text-base transition-transform duration-300 group-hover:scale-110 relative z-10">📊<\/span>/<FontAwesomeIcon icon="chart-bar" className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-yellow-500" \/>/g' $FILE

echo "All emoji icons have been replaced with Font Awesome icons!"
